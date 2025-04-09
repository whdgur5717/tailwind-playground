import { Button } from "@/ui/button"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { useEffect, useRef, useState } from "react"
import ts from "typescript"
import browser from "../raw/browser?raw"
import { Input } from "../ui/input"
import { useEditorContext } from "./editorContext"

const defaultPackages = {
	react: "https://esm.sh/react",
	"react/": "https://esm.sh/react/",
	"react-dom": "https://esm.sh/react-dom",
	"react-dom/": "https://esm.sh/react-dom/",
	"esbuild-wasm": "https://esm.sh/esbuild-wasm",
}

export const Editor = () => {
	const { files, setFiles } = useEditorContext("editor")

	const [editor, setEditor] =
		useState<monaco.editor.IStandaloneCodeEditor | null>(null)
	const monacoEl = useRef<HTMLDivElement | null>(null)
	const [activeFileId, setActiveFileId] = useState<string>(files[0].name)
	const [models, setModels] = useState<Map<string, monaco.editor.ITextModel>>(
		new Map(),
	)

	const addPackage = async (path: string) => {
		const worker = await monaco.languages.typescript.getTypeScriptWorker()
		const currentWorker = await worker()

		const response = await fetch(path)
		const typePath = response.headers.get("X-Typescript-Types")
		if (!typePath) {
			return
		}

		currentWorker.addUrl(path, typePath)

		const importMap: Record<string, string> = {}

		const processTypeFile = async (filePath: string) => {
			if (importMap[filePath]) {
				return
			}
			const response = await fetch(filePath)
			const text = await response.text()
			importMap[filePath] = text

			const refFiles = ts.preProcessFile(text, true, true)
			// 원본 코드와 동일하게 조건 유지
			if (!refFiles.importedFiles.length && !refFiles.referencedFiles.length) {
				return
			}
			for (const reference of refFiles.referencedFiles) {
				const href = new URL(reference.fileName, filePath).href
				await processTypeFile(href)
			}
			for (const file of refFiles.importedFiles) {
				await processTypeFile(file.fileName)
			}
			return importMap
		}
		await processTypeFile(typePath)

		Object.entries(importMap).forEach(([key, value]) =>
			currentWorker.addFile("inmemory://model/node_modules/" + key, value),
		)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (monacoEl.current && !editor) {
			const editorInstance = monaco.editor.create(monacoEl.current, {
				theme: "vs-dark",
				automaticLayout: true,
			}) //에디터 인스턴스 생성 - 최초 한번

			const initialModels = new Map<string, monaco.editor.ITextModel>()
			files.forEach((file) => {
				// 각 파일의 URI 파싱
				const modelUri = monaco.Uri.parse(file.name)
				let model = monaco.editor.getModel(modelUri)

				if (!model || model.isDisposed()) {
					model = monaco.editor.createModel(
						file.content,
						file.language,
						modelUri,
					)
				}
				// 생성/확보한 모델을 Map에 추가
				initialModels.set(file.name, model)
			})
			// models 상태를 생성된 초기 모델들로 한번에 설정
			setModels(initialModels)

			editorInstance.onDidChangeModelContent(() => {
				//에디터 내용 변경 감지 리스너
				const currentModel = editorInstance.getModel()
				if (currentModel) {
					const currentUri = currentModel.uri.toString()

					setFiles((prevFiles) =>
						prevFiles.map((file) =>
							file.uri === currentUri
								? { ...file, content: editorInstance.getValue() }
								: file,
						),
					)
				}
			})
			setEditor(editorInstance)
		}

		return () => {
			models.forEach((model) => model.dispose())
			editor?.dispose()
			setEditor(null)
		}
	}, [monacoEl])

	useEffect(() => {
		if (editor && activeFileId) {
			const activeFile = files.find((f) => f.name === activeFileId)
			if (activeFile) {
				let model = models.get(activeFile.uri)

				const modelUri = monaco.Uri.parse(activeFile.uri)

				if (!model || model.isDisposed()) {
					const existingGlobalModel = monaco.editor.getModel(modelUri)
					if (existingGlobalModel && !existingGlobalModel.isDisposed()) {
						model = existingGlobalModel
						if (model.getValue() !== activeFile.content) {
							model.setValue(activeFile.content)
						}
					} else {
						model = monaco.editor.createModel(
							activeFile.content,
							activeFile.language,
							modelUri,
						)
					}
					setModels((prevModels) =>
						new Map(prevModels).set(activeFile.uri, model!),
					)
				}
				if (editor.getModel() !== model) {
					editor.setModel(model)
				}
			}
		}
	}, [editor, activeFileId, files])

	const activeFile = files.find((f) => f.name === activeFileId)

	const previewScript = `
import * as esbuild from 'esbuild-wasm';

try {
  await esbuild.default.initialize({
    worker: true,
    wasmURL: 'https://esm.sh/esbuild-wasm/esbuild.wasm',
  });

  const files = ${JSON.stringify(files)};

  const mainCode = ${JSON.stringify(files?.find((f) => f.name === "main.tsx")?.content)}

  const result = await esbuild.default.build({
    stdin: {
      contents: mainCode,
      loader: 'tsx',
      resolveDir: 'file:///',
      sourcefile: 'main.tsx'
    },
    bundle: true,
    format: 'esm',
    jsx: 'automatic',
    jsxImportSource: 'react',
    write: false,
	plugins: [
    {
      name: 'virtual-fs',
      setup(build) {
   
        build.onResolve({ filter: new RegExp('^react/jsx-runtime$')}, () => {
          return { path: 'https://esm.sh/react/jsx-runtime', external: true }
        });

        build.onResolve({ filter: /.*/ }, (args) => {
          if (args.path.startsWith('http') || args.path.startsWith('https')) {
            return { external: true };
          }
          return { path: args.path, namespace: 'virtual-fs' };
        });
        
        // 파일 내용 로드
        build.onLoad({ filter: /.*/, namespace: 'virtual-fs' }, (args) => {
          const file = files.find(f => f.name === args.path || './' + f.name === args.path);
          if (!file) return { contents: console.error("File not found: args.path")};
          
          // 로더 결정
          const loader = file.name.endsWith('.css') ? 'css' : 
                        file.name.endsWith('.tsx') ? 'tsx' : 
                        file.name.endsWith('.ts') ? 'ts' : 'js';
                        
          return { contents: file.content, loader };
        });
      }
    }
  ]
  });

 
  const oldScript = document.getElementById('preview-script');
  if (oldScript) oldScript.remove();
  const root = document.getElementById('root');
  if (root) root.innerHTML = '';

  const script = document.createElement('script');
  script.setAttribute('type', 'module');
  script.setAttribute('id', 'preview-script');
  script.textContent = result.outputFiles[0].text;
  document.head.appendChild(script);
} catch (e) {
  console.error("Error in preview script:", e);
  const errorDiv = document.createElement('pre');
  errorDiv.style.color = 'red';
  errorDiv.textContent = e.message + '\\n' + e.stack;
  document.body.innerHTML = '';
  document.body.appendChild(errorDiv);
}`.trim()

	const sources = {
		imports: defaultPackages,
	}

	const srcDoc = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Preview</title>
	<script>${browser}</script>
    <script type="importmap">
      ${JSON.stringify(sources, null, 2)}
    </script>
    <script type="module">
      ${previewScript}
    </script>
  </head>
  <body>
    <div id="root">Loading Preview...</div>
  </body>
</html>
`

	return (
		<div className="box-border flex h-screen w-screen min-w-full flex-col gap-2.5 p-2.5">
			<div className="mb-1.5 flex-shrink-0 border-gray-300 border-b pb-1.5">
				{files.map((file) => (
					<Button
						key={file.name}
						variant={file.name === activeFileId ? "default" : "outline"}
						size="sm"
						onClick={() => setActiveFileId(file.name)}
						className="mr-1.5"
					>
						{file.name}
					</Button>
				))}
			</div>

			<div className="flex h-[calc(100%-80px)] flex-grow gap-2.5">
				<div ref={monacoEl} className="flex-1 border border-gray-500" />
				<iframe
					title="preview"
					key={activeFileId + activeFile?.content}
					srcDoc={srcDoc}
				/>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					const formData = new FormData(e.currentTarget)
					const packageUrl = formData.get("packageUrl")
					if (typeof packageUrl === "string" && packageUrl.trim()) {
						addPackage(packageUrl.trim())
					}
				}}
				className="flex flex-shrink-0 gap-1.5 py-1.5"
			>
				<Input
					type="url"
					pattern="https://.*"
					name="packageUrl"
					placeholder="Enter package URL (e.g., https://esm.sh/@radix-ui/react-dialog)"
				/>
				<Button type="submit">Add Types</Button>
			</form>
		</div>
	)
}

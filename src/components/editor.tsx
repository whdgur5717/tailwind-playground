import { Button } from "@/components/ui/button"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { useEffect, useRef, useState } from "react"
import ts from "typescript"
import { Input } from "./ui/input"

const defaultPackages = {
	react: "https://esm.sh/react",
	"react/": "https://esm.sh/react/",
	"react-dom": "https://esm.sh/react-dom",
	"react-dom/": "https://esm.sh/react-dom/",
	"esbuild-wasm": "https://esm.sh/esbuild-wasm",
}

interface FileData {
	id: string
	name: string
	language: string
	uriString: string
	content: string
}

const initialFiles: FileData[] = [
	{
		id: "main.tsx",
		name: "main.tsx",
		language: "typescript",
		uriString: "file:///main.tsx",
		content: `
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(<App/>);
}
    `.trim(),
	},
	{
		id: "styles.css",
		name: "styles.css",
		language: "css",
		uriString: "file:///styles.css",
		content: `
.hello-css {
  color: green;
  margin-top: 10px;
  border: 1px solid green;
  padding: 5px;
}
    `.trim(),
	},
	{
		id: "app.tsx",
		name: "app.tsx",
		language: "typescript",
		uriString: "file:///app.tsx",
		content: `export const App = () => {
  return <div>Test입니다</div>}`,
	},
]

export const Editor = () => {
	const [editor, setEditor] =
		useState<monaco.editor.IStandaloneCodeEditor | null>(null)
	const monacoEl = useRef<HTMLDivElement | null>(null)
	const [files, setFiles] = useState<FileData[]>(initialFiles)
	const [activeFileId, setActiveFileId] = useState<string>(initialFiles[0].id)
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

	useEffect(() => {
		if (monacoEl.current && !editor) {
			const editorInstance = monaco.editor.create(monacoEl.current, {
				theme: "vs-dark",
				automaticLayout: true,
			}) //에디터 인스턴스 생성 - 최초 한번

			editorInstance.onDidChangeModelContent(() => {
				//에디터 내용 변경 감지 리스너
				const currentModel = editorInstance.getModel()
				if (currentModel) {
					const currentUri = currentModel.uri.toString()

					setFiles((prevFiles) =>
						prevFiles.map((f) =>
							f.uriString === currentUri
								? { ...f, content: editorInstance.getValue() }
								: f,
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
			const activeFile = files.find((f) => f.id === activeFileId)
			if (activeFile) {
				let model = models.get(activeFile.uriString)

				const modelUri = monaco.Uri.parse(activeFile.uriString)

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
						new Map(prevModels).set(activeFile.uriString, model!),
					)
				}
				if (editor.getModel() !== model) {
					editor.setModel(model)
				}
			}
		}
	}, [editor, activeFileId, files])

	const activeFile = files.find((f) => f.id === activeFileId)

	const previewScript = `
    import * as esbuild from 'esbuild-wasm';

      try {
        await esbuild.default.initialize({
          worker: true,
          wasmURL: 'https://esm.sh/esbuild-wasm'
        });

        const mainCode = ${JSON.stringify(files?.find((f) => f.name === "main.tsx")?.content)}


        const result = await esbuild.default.transform(mainCode, {
          loader: 'tsx',
          jsx: 'automatic',
          jsxImportSource: 'react',
          format: 'esm',
        });

        if (result.warnings.length > 0) {
            console.warn("esbuild warnings:", result.warnings);
        }

        const oldScript = document.getElementById('preview-script');
        if (oldScript) oldScript.remove();
        const root = document.getElementById('root');
        if (root) root.innerHTML = '';


        const script = document.createElement('script');
        script.setAttribute('type', 'module');
        script.setAttribute('id', 'preview-script');
        script.textContent = result.code;
        document.head.appendChild(script);

      } catch (e) {
        console.error("Error in preview script:", e);
        const errorDiv = document.createElement('pre');
        errorDiv.style.color = 'red';
        errorDiv.textContent = e.message + '\\n' + e.stack;
        document.body.innerHTML = '';
        document.body.appendChild(errorDiv);
}
  `

	const sources = {
		imports: defaultPackages,
	}

	const srcDoc = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Preview</title>
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
						key={file.id}
						variant={file.id === activeFileId ? "default" : "outline"}
						size="sm"
						onClick={() => setActiveFileId(file.id)}
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

import { Button } from "@/components/ui/button"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { useEffect, useRef, useState } from "react"
import ts from "typescript"

const defaultPackages = {
	react: "https://esm.sh/react",
	"react/": "https://esm.sh/react/",
	"react-dom": "https://esm.sh/react-dom",
	"react-dom/": "https://esm.sh/react-dom/",
	"esbuild-wasm": "https://esm.sh/esbuild-wasm",
} //기본적으로 사용될 패키지

const defaultCode = `
  import { createElement } from 'react';
  import { createRoot } from 'react-dom/client';
  function App() {
    return <div>Hello World</div>;
  }
  createRoot(document.getElementById("root")).render(createElement(App));
`

export const Editor = () => {
	const [editor, setEditor] =
		useState<monaco.editor.IStandaloneCodeEditor | null>(null)
	const monacoEl = useRef(null)
	const [importMap, setImportMap] = useState(defaultPackages)
	const [editorCode, setEditorCode] = useState(defaultCode)

	const addPackage = async (path: string) => {
		const worker = await monaco.languages.typescript.getTypeScriptWorker()
		const currentWorker = await worker()

		const response = await fetch(path)
		const typePath = response.headers.get("X-Typescript-Types")
		if (!typePath) {
			return
		}

		currentWorker.addUrl(path, typePath) //패키지가 참조해야 할 타입파일의 경로 저장

		const importMap: Record<string, string> = {}

		const processTypeFile = async (filePath: string) => {
			if (importMap[filePath]) {
				return
			}
			const response = await fetch(filePath)
			const text = await response.text()
			importMap[filePath] = text

			const refFiles = ts.preProcessFile(text, true, true)
			if (!refFiles.importedFiles.length) {
				return
			}
			console.log(refFiles, filePath)
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
		if (monacoEl.current) {
			setEditor((editor) => {
				if (editor) return editor
				const ed = monaco.editor.create(monacoEl.current, {
					value: editorCode,
					language: "typescript",
					theme: "vs-dark",
				})
				ed.onDidChangeModelContent(() => {
					setEditorCode(ed.getValue())
				})
				return ed
			})
		}
		return () => editor?.dispose()
	}, [monacoEl.current])

	const previewScript = `
    import * as esbuild from 'esbuild-wasm';
    await esbuild.default.initialize({
      worker: true,
      wasmURL: 'https://esm.sh/esbuild-wasm/esbuild.wasm'
    });
    const result = await esbuild.default.transform(${JSON.stringify(editorCode)}, {
      loader: 'tsx',
      jsx: 'automatic',
      jsxImportSource: 'react',
      format: 'esm',
    });
    const $script = document.createElement('script');
    $script.setAttribute('type', 'module');
    $script.text = result.code;
    document.head.appendChild($script);
  `

	const sources = {
		imports: importMap,
	}

	const srcDoc = `
    <!DOCTYPE html>
    <html>
    <head>
      <script type="importmap">
        ${JSON.stringify(sources)}
      </script>
      <script type="module">
        ${previewScript}
      </script>
    </head>
    <body>
      <div id="root"></div>
    </body>
    </html>
  `
	return (
		<div
			style={{
				display: "flex",
				gap: "10px",
				height: "100vh",
				width: "100vw",
				minWidth: "100vw",
			}}
		>
			<div ref={monacoEl} style={{ flex: 1 }} />
			<button onClick={() => addPackage("radix-ui", "https://esm.sh/radix-ui")}>
				타입 파일 추가
			</button>
			<iframe
				title="preview"
				style={{ flex: 1, border: "none" }}
				srcDoc={srcDoc}
			/>
		</div>
	)
}

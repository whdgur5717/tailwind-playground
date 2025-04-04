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
			<form
				onSubmit={(e) => {
					e.preventDefault()
					const formData = new FormData(e.currentTarget)
					const packageUrl = formData.get("packageUrl")
					if (packageUrl) {
						addPackage(packageUrl.toString())
					}
				}}
			>
				<input
					name="packageUrl"
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
				/>
				<Button type="submit">add package</Button>
			</form>
			<iframe
				title="preview"
				style={{ flex: 1, border: "none" }}
				srcDoc={srcDoc}
			/>
		</div>
	)
}

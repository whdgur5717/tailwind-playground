import { useRef, useState, useEffect } from "react"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import ts from "typescript"

//패키지 추가는 https://esm.sh ~ 형태로 추가해야할것 같음 -> 어떤걸 꺼내쓸지는 알바아님

const defaultPackages = {
  react: "https://esm.sh/react",
  "react/": "https://esm.sh/react/",
  "react-dom": "https://esm.sh/react-dom",
  "react-dom/": "https://esm.sh/react-dom/",
  "esbuild-wasm": "https://esm.sh/esbuild-wasm",
  "radix-ui": "https://esm.sh/radix-ui",
}
const defaultCode = `
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
function App() {
return <div>Hello World</div>;
}
createRoot(document.getElementById("root")).render(createElement(App));
`
export const Editor = () => {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null)
  const monacoEl = useRef(null)
  const [imports, setImports] = useState(defaultPackages)
  const [code, setCode] = useState(defaultCode)

  const addPackage = async (moduleName: string, path: string) => {
    setImports(prev => ({ ...prev, [moduleName]: path }))
    const response = await fetch(path)
    const typePath = response.headers.get("X-Typescript-Types")
    if (!typePath) {
      return
    }
    const importMap: Record<string, string> = {}
    const processTypeFile = async (filePath: string) => {
      if (importMap[filePath]) {
        console.log(filePath)
        return
      }
      const response = await fetch(filePath)
      const text = await response.text()
      importMap[filePath] = text
      const refFiles = ts.preProcessFile(text, true, true)
      if (!refFiles.importedFiles.length) {
        return
      }

      for (const file of refFiles.importedFiles) {
        await processTypeFile(file.fileName)
      }
      return importMap
    }
    await processTypeFile(typePath)
    console.log(Object.keys(importMap))
    const worker = await monaco.languages.typescript.getTypeScriptWorker()
    const currentWorker = await worker()
    Object.entries(importMap).forEach(([key, value]) =>
      currentWorker.addFile("inmemory://model/node_modules/" + key, value)
    )
  }

  useEffect(() => {
    if (monacoEl.current) {
      setEditor(editor => {
        if (editor) return editor
        const ed = monaco.editor.create(monacoEl.current!, {
          value: code,
          language: "typescript",
          theme: "vs-dark",
        })
        ed.onDidChangeModelContent(() => {
          setCode(ed.getValue())
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
const result = await esbuild.default.transform(${JSON.stringify(code)}, {
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
  const importMap = {
    imports: imports,
  }
  const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
<script type="importmap">
${JSON.stringify(importMap)}
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
      style={{ display: "flex", gap: "10px", height: "100vh", width: "100vw", minWidth: "100vw" }}>
      <div
        ref={monacoEl}
        style={{ flex: 1 }}></div>
      <button onClick={() => addPackage("radix-ui", "https://esm.sh/radix-ui")}>
        타입 파일 추가
      </button>
      <iframe
        style={{ flex: 1, border: "none" }}
        srcDoc={htmlTemplate}
      />
    </div>
  )
}

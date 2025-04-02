import { useRef, useState, useEffect } from "react"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"

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

      <iframe
        style={{ flex: 1, border: "none" }}
        srcDoc={htmlTemplate}
      />
    </div>
  )
}

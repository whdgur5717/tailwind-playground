import * as monaco from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import { createRoot } from "react-dom/client"
import App from "./App"

self.MonacoEnvironment = {
	getWorker(_, label) {
		if (label === "json") {
			return new jsonWorker()
		}
		if (label === "css" || label === "scss" || label === "less") {
			return new cssWorker()
		}
		if (label === "html" || label === "handlebars" || label === "razor") {
			return new htmlWorker()
		}
		if (label === "javascript" || label === "typescript") {
			return new Worker("/worker.js", { type: "module" })
		}
		return new editorWorker()
	},
}

monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
	noSemanticValidation: false,
	noSyntaxValidation: false,
})
monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
	target: monaco.languages.typescript.ScriptTarget.ESNext,
	allowJs: true,
	checkJs: true,
	allowNonTsExtensions: true,
})
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
	target: monaco.languages.typescript.ScriptTarget.ESNext,
	allowNonTsExtensions: true,
	moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
	module: monaco.languages.typescript.ModuleKind.ESNext,
	noEmit: true,
	esModuleInterop: true,
	jsx: "https://esm.sh/react/jsx-runtime",
	reactNamespace: "React",
	allowJs: true,
	checkJs: true,
	strict: true,
	allowImportingTsExtensions: true,
})

createRoot(document.getElementById("root")!).render(<App />)

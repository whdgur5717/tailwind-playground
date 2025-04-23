import { makeAutoObservable, observable } from "mobx"

interface FileData {
	name: string
	language: string
	uri: string
	content: string
}

const defaultFiles: Record<string, FileData> = {
	"main.tsx": {
		name: "main.tsx",
		language: "typescript",
		uri: "file:///main.tsx",
		content: `
import React from 'https://esm.sh/react';
import { createRoot } from 'https://esm.sh/react-dom/client';
import { App } from './app.tsx';

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(<App/>);
}
    `.trim(),
	},
	"styles.css": {
		name: "styles.css",
		language: "css",
		uri: "file:///styles.css",
		content: `
.hello-css {
  color: green;
  margin-top: 10px;
  border: 1px solid green;
  padding: 5px;
}
    `.trim(),
	},
	"app.tsx": {
		name: "app.tsx",
		language: "typescript",
		uri: "file:///app.tsx",
		content: `export const App = () => {
  return <div className='text-blue-600'>Test입니다</div>}`,
	},
}

const defaultPackages: Record<string, string> = {
	react: "https://esm.sh/react",
	"react/": "https://esm.sh/react/",
	"react-dom": "https://esm.sh/react-dom",
	"react-dom/": "https://esm.sh/react-dom/",
	"esbuild-wasm": "https://esm.sh/esbuild-wasm",
}

class EditorStore {
	files = observable.map<string, FileData>()
	packages = observable.map<string, string>()

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
		Object.keys(defaultFiles).forEach((file) =>
			this.files.set(file, defaultFiles[file]),
		)
		Object.keys(defaultPackages).forEach((pkg) =>
			this.packages.set(pkg, defaultPackages[pkg]),
		)
	}

	addFile(file: FileData) {
		this.files.set(file.uri, file)
	}

	updateFileContent(fileName: string, content: string) {
		const file = this.files.get(fileName)
		if (file) {
			this.files.set(fileName, { ...file, content })
		}
	}

	addPackage(name: string, module: string) {
		this.packages.set(name, module)
	}
}

export const editorStore = new EditorStore()

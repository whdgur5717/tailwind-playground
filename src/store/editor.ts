import { makeAutoObservable } from "mobx"

interface FileData {
	name: string
	language: string
	uri: string
	content: string
}

const defaultFiles: FileData[] = [
	{
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
	{
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
	{
		name: "app.tsx",
		language: "typescript",
		uri: "file:///app.tsx",
		content: `export const App = () => {
  return <div className='text-blue-600'>Test입니다</div>}`,
	},
]

const defaultPackages = {
	react: "https://esm.sh/react",
	"react/": "https://esm.sh/react/",
	"react-dom": "https://esm.sh/react-dom",
	"react-dom/": "https://esm.sh/react-dom/",
	"esbuild-wasm": "https://esm.sh/esbuild-wasm",
}

class EditorStore {
	files: FileData[]
	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
		this.files = defaultFiles
	}
	setFiles(file: FileData) {
		this.files = [...this.files, file]
	}
	updateFileContent(uri: string, content: string) {
		this.files = this.files.map((file) =>
			file.uri === uri ? { ...file, content } : file,
		)
	}
}

export const editorStore = new EditorStore()

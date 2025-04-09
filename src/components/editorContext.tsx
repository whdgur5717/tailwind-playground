import { Context } from "radix-ui/internal"
import { type SetStateAction, useState } from "react"
import { Editor } from "./editor"

interface FileData {
	name: string
	language: string
	uri: string
	content: string
}

interface EditorContextType {
	files: FileData[]
	setFiles: React.Dispatch<SetStateAction<EditorContextType["files"]>>
	packages: Record<string, string>
}

const initialFiles: FileData[] = [
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

export const [EditorProvider, useEditorContext] =
	Context.createContext<EditorContextType>("editor")

const defaultPackages = {
	react: "https://esm.sh/react",
	"react/": "https://esm.sh/react/",
	"react-dom": "https://esm.sh/react-dom",
	"react-dom/": "https://esm.sh/react-dom/",
	"esbuild-wasm": "https://esm.sh/esbuild-wasm",
}

export const EditorWrapper = () => {
	const [files, setFiles] = useState<FileData[]>(initialFiles)

	return (
		<div>
			<EditorProvider
				files={files}
				setFiles={setFiles}
				packages={defaultPackages}
			>
				<Editor />
			</EditorProvider>
		</div>
	)
}

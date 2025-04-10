import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { useRef } from "react"
import ts from "typescript"

const EditorForm = () => {
	const inputRef = useRef<HTMLInputElement>(null)

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
	return (
		<form
			onSubmit={async (e) => {
				if (inputRef.current === null) {
					return
				}
				e.preventDefault()
				await addPackage(inputRef.current.value)
			}}
		>
			<Input ref={inputRef} />
			<Button type="submit">타입 추가</Button>
		</form>
	)
}

export default EditorForm

import { Button } from "@/components/button"
import * as monaco from "monaco-editor"
import { useEffect, useRef } from "react"
import ts from "typescript"
import type { CustomTSWorker } from "../../worker"

/**monaco editor의 TypeScriptWorker 타입을 CustomTSWorker로 추론되게 하기 위한 함수*/
function isCustomWorker(
	worker: monaco.languages.typescript.TypeScriptWorker | CustomTSWorker,
): worker is CustomTSWorker {
	// biome-ignore lint/suspicious/noExplicitAny: to decide worker method
	const potentialWorker = worker as any
	return (
		potentialWorker.addFile &&
		potentialWorker.addUrl &&
		typeof potentialWorker.addFile === "function" &&
		typeof potentialWorker.addUrl === "function"
	)
}

const EditorForm = () => {
	const inputRef = useRef<HTMLInputElement>(null)

	const addPackage = async (path: string) => {
		const worker = await monaco.languages.typescript.getTypeScriptWorker()
		const currentWorker = await worker()
		if (!isCustomWorker(currentWorker)) {
			return
		}

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
			if (!refFiles.importedFiles.length && !refFiles.referencedFiles.length) {
				return
			}
			for (const reference of refFiles.referencedFiles) {
				const href = new URL(reference.fileName, filePath).href
				await processTypeFile(href)
			}
			for (const file of refFiles.importedFiles) {
				const href = new URL(file.fileName, filePath).href
				await processTypeFile(href)
			}
			return importMap
		}
		await processTypeFile(typePath)

		Object.entries(importMap).forEach(([key, value]) =>
			currentWorker.addFile(`inmemory://model/node_modules/${key}`, value),
		)
		return true
	}

	useEffect(() => {
		async function initialAdd() {
			await addPackage("https://esm.sh/react/jsx-runtime")
			await addPackage("https://esm.sh/react")
			await addPackage("https://esm.sh/react-dom/client")
			await addPackage("https://esm.sh/es-toolkit")
			const worker = await monaco.languages.typescript.getTypeScriptWorker()
			const currentWorker = await worker()
			if (!isCustomWorker(currentWorker)) {
				return
			}
		}
		initialAdd()
	}, [])

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
			<input ref={inputRef} />
			<Button type="submit">타입 추가</Button>
		</form>
	)
}

export default EditorForm

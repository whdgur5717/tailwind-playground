import { Button } from "@/ui/button"
import { observer } from "mobx-react-lite"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { useEffect, useRef, useState } from "react"
import ts from "typescript"
import { editorStore } from "../store/editor"
import { Input } from "../ui/input"

const Editor = () => {
	const { files, updateFileContent } = editorStore

	const [editor, setEditor] =
		useState<monaco.editor.IStandaloneCodeEditor | null>(null)
	const monacoEl = useRef<HTMLDivElement | null>(null)
	const [activeFileId, setActiveFileId] = useState<string>(files[0].name)
	const [models, setModels] = useState<Map<string, monaco.editor.ITextModel>>(
		new Map(),
	)

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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (monacoEl.current && !editor) {
			const editorInstance = monaco.editor.create(monacoEl.current, {
				theme: "vs-dark",
				automaticLayout: true,
			}) //에디터 인스턴스 생성 - 최초 한번

			const initialModels = new Map<string, monaco.editor.ITextModel>()
			files.forEach((file) => {
				// 각 파일의 URI 파싱
				const modelUri = monaco.Uri.parse(file.name)
				let model = monaco.editor.getModel(modelUri)

				if (!model || model.isDisposed()) {
					model = monaco.editor.createModel(
						file.content,
						file.language,
						modelUri,
					)
				}
				// 생성/확보한 모델을 Map에 추가
				initialModels.set(file.name, model)
			})
			// models 상태를 생성된 초기 모델들로 한번에 설정
			setModels(initialModels)

			editorInstance.onDidChangeModelContent(() => {
				//에디터 내용 변경 감지 리스너

				const currentModel = editorInstance.getModel()
				if (currentModel) {
					const currentUri = currentModel.uri.toString()
					updateFileContent(currentUri, editorInstance.getValue())
				}
			})
			setEditor(editorInstance)
		}

		return () => {
			models.forEach((model) => model.dispose())
			editor?.dispose()
			setEditor(null)
		}
	}, [monacoEl])

	useEffect(() => {
		if (editor && activeFileId) {
			const activeFile = files.find((f) => f.name === activeFileId)
			if (activeFile) {
				let model = models.get(activeFile.uri)

				const modelUri = monaco.Uri.parse(activeFile.uri)

				if (!model || model.isDisposed()) {
					const existingGlobalModel = monaco.editor.getModel(modelUri)
					if (existingGlobalModel && !existingGlobalModel.isDisposed()) {
						model = existingGlobalModel
						if (model.getValue() !== activeFile.content) {
							model.setValue(activeFile.content)
						}
					} else {
						model = monaco.editor.createModel(
							activeFile.content,
							activeFile.language,
							modelUri,
						)
					}
					setModels((prevModels) =>
						new Map(prevModels).set(activeFile.uri, model!),
					)
				}
				if (editor.getModel() !== model) {
					editor.setModel(model)
				}
			}
		}
	}, [editor, activeFileId, files])

	return (
		<div className="box-border flex h-screen w-screen min-w-full flex-col gap-2.5 p-2.5">
			<div className="mb-1.5 flex-shrink-0 border-gray-300 border-b pb-1.5">
				{files.map((file) => (
					<Button
						key={file.name}
						variant={file.name === activeFileId ? "default" : "outline"}
						size="sm"
						onClick={() => setActiveFileId(file.name)}
						className="mr-1.5"
					>
						{file.name}
					</Button>
				))}
			</div>

			<div className="flex h-[calc(100%-80px)] flex-grow gap-2.5">
				<div ref={monacoEl} className="flex-1 border border-gray-500" />
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					const formData = new FormData(e.currentTarget)
					const packageUrl = formData.get("packageUrl")
					if (typeof packageUrl === "string" && packageUrl.trim()) {
						addPackage(packageUrl.trim())
					}
				}}
				className="flex flex-shrink-0 gap-1.5 py-1.5"
			>
				<Input
					type="url"
					pattern="https://.*"
					name="packageUrl"
					placeholder="Enter package URL (e.g., https://esm.sh/@radix-ui/react-dialog)"
				/>
				<Button type="submit">Add Types</Button>
			</form>
		</div>
	)
}

export default observer(Editor)

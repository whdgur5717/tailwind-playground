import { observer } from "mobx-react-lite"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import { useEffect, useRef, useState } from "react"
import { editorStore } from "../store/editor"

interface EditorProps {
	className?: string
}

const Editor = ({ className }: EditorProps) => {
	const { files, updateFileContent } = editorStore

	const [editor, setEditor] =
		useState<monaco.editor.IStandaloneCodeEditor | null>(null)
	const monacoEl = useRef<HTMLDivElement | null>(null)
	const [activeFileId, setActiveFileId] = useState<string>(files[0].name)
	const [models, setModels] = useState<Map<string, monaco.editor.ITextModel>>(
		new Map(),
	)

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

	return <div ref={monacoEl} className={className} />
}

export default observer(Editor)

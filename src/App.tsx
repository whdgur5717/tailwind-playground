import Editor from "./components/editor"
import EditorForm from "./components/editorForm"
import Preview from "./components/preview"
import "./globals.css"
function App() {
	return (
		<div className="flex h-screen w-screen min-w-full flex-row gap-2.5 p-2.5">
			<Editor className="min-w-0 flex-1" />
			<Preview className='className="min-w-0 flex-1' />
			<EditorForm />
		</div>
	)
}

export default App

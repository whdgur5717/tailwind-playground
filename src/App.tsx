import Editor from "./components/editor"
import EditorForm from "./components/editorForm"
import { Header } from "./components/header"
import Preview from "./components/preview"
import "./globals.css"

function App() {
	return (
		<div className="flex h-screen w-screen flex-col bg-background">
			<Header />
			<EditorForm />
			<div className="flex flex-1 overflow-hidden">
				<div className="flex w-1/2 flex-col border-border border-r">
					<Editor className="h-full w-full" />
				</div>
				<div className="flex w-1/2 flex-col">
					<Preview className="h-full w-full" />
				</div>
			</div>
		</div>
	)
}

export default App

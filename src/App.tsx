import Editor from "./components/editor"
import Preview from "./components/preview"
import "./globals.css"
function App() {
	return (
		<div className="flex h-screen w-screen min-w-full flex-row gap-2.5 p-2.5">
			<Editor className="min-w-0 flex-1" />
			<Preview className='className="min-w-0 flex-1' />
		</div>
	)
}

export default App

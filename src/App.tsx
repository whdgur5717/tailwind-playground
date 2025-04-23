import { css } from "@styled/css"
import Editor from "./components/editor"
import EditorForm from "./components/editorForm"
import Preview from "./components/preview"
import "./globals.css"
function App() {
	return (
		<div
			className={css({
				display: "flex",
				h: "screen",
				w: "screen",
				minW: "full",
				flexDir: "row",
				gap: "2.5",
				p: "2.5",
			})}
		>
			<Editor
				className={css({
					minW: 0,
					flex: 1,
				})}
			/>
			<Preview
				className={css({
					minW: 0,
					flex: 1,
				})}
			/>
			<EditorForm />
		</div>
	)
}

export default App

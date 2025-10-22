import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Plus, X } from "lucide-react"
import * as monaco from "monaco-editor"
import { useEffect, useState } from "react"
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
	const [packageInput, setPackageInput] = useState("")
	const [packages, setPackages] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const addPackage = async (path: string) => {
		const worker = await monaco.languages.typescript.getTypeScriptWorker()
		const currentWorker = await worker()
		if (!isCustomWorker(currentWorker)) {
			return false
		}

		const response = await fetch(path)
		const typePath = response.headers.get("X-Typescript-Types")
		if (!typePath) {
			return false
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

	const handleAddPackage = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!packageInput.trim() || isLoading) return

		setIsLoading(true)
		try {
			const packageUrl = packageInput.startsWith("https://")
				? packageInput
				: `https://esm.sh/${packageInput}`

			const success = await addPackage(packageUrl)
			if (success) {
				setPackages((prev) => [...prev, packageInput.trim()])
				setPackageInput("")
			}
		} finally {
			setIsLoading(false)
		}
	}

	const removePackage = (packageToRemove: string) => {
		setPackages((prev) => prev.filter((pkg) => pkg !== packageToRemove))
	}

	useEffect(() => {
		async function initialAdd() {
			const initialPackages = [
				"https://esm.sh/react/jsx-runtime",
				"https://esm.sh/react",
				"https://esm.sh/react-dom/client",
				"https://esm.sh/es-toolkit",
			]

			for (const pkg of initialPackages) {
				await addPackage(pkg)
			}

			setPackages(["react", "react-dom/client", "es-toolkit"])
		}
		initialAdd()
	}, [])

	return (
		<div className="flex flex-col gap-4 border-border border-b bg-background px-6 py-4">
			<div className="flex flex-col gap-2">
				<h2 className="font-semibold text-foreground text-sm">
					Package Manager
				</h2>
				<form onSubmit={handleAddPackage} className="flex gap-2">
					<Input
						value={packageInput}
						onChange={(e) => setPackageInput(e.target.value)}
						placeholder="lodash@4.17.21"
						disabled={isLoading}
						className="flex-1"
					/>
					<Button type="submit" disabled={isLoading || !packageInput.trim()}>
						<Plus className="size-4" />
						Add
					</Button>
				</form>
			</div>

			{packages.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{packages.map((pkg) => (
						<Badge
							key={pkg}
							variant="secondary"
							className="cursor-pointer hover:bg-secondary/60"
						>
							{pkg}
							<button
								type="button"
								onClick={() => removePackage(pkg)}
								className="ml-1 rounded-sm hover:bg-destructive/20"
								aria-label={`Remove ${pkg}`}
							>
								<X className="size-3" />
							</button>
						</Badge>
					))}
				</div>
			)}
		</div>
	)
}

export default EditorForm

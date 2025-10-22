import { Code2 } from "lucide-react"

export function Header() {
	return (
		<header className="flex items-center gap-3 border-border border-b bg-background px-6 py-4">
			<Code2 className="size-6 text-primary" />
			<h1 className="font-semibold text-foreground text-xl">Code Playground</h1>
		</header>
	)
}

import { definePreset, defineSemanticTokens } from "@pandacss/dev"

const colors = defineSemanticTokens.colors({
	background: {
		value: { base: "{colors.white}", _dark: "{colors.zinc.950}" },
	},
	foreground: {
		value: { base: "{colors.zinc.950}", _dark: "{colors.zinc.50}" },
	},
	card: {
		DEFAULT: {
			value: { base: "{colors.white}", _dark: "{colors.zinc.900}" },
		},
		foreground: {
			value: { base: "{colors.zinc.950}", _dark: "{colors.zinc.50}" },
		},
	},
	popover: {
		DEFAULT: {
			value: { base: "{colors.white}", _dark: "{colors.zinc.900}" },
		},
		foreground: {
			value: { base: "{colors.zinc.950}", _dark: "{colors.zinc.50}" },
		},
	},
	primary: {
		DEFAULT: {
			value: { base: "{colors.blue.600}", _dark: "{colors.blue.400}" },
		},
		foreground: {
			value: { base: "{colors.white}", _dark: "{colors.zinc.950}" },
		},
	},
	secondary: {
		DEFAULT: {
			value: { base: "{colors.slate.600}", _dark: "{colors.slate.400}" },
		},
		foreground: {
			value: { base: "{colors.white}", _dark: "{colors.zinc.950}" },
		},
	},
	muted: {
		DEFAULT: {
			value: { base: "{colors.zinc.100}", _dark: "{colors.zinc.800}" },
		},
		foreground: {
			value: { base: "{colors.zinc.500}", _dark: "{colors.zinc.400}" },
		},
	},
	accent: {
		DEFAULT: {
			value: { base: "{colors.slate.100}", _dark: "{colors.slate.800}" },
		},
		foreground: {
			value: { base: "{colors.slate.900}", _dark: "{colors.slate.50}" },
		},
	},
	destructive: {
		DEFAULT: {
			value: { base: "{colors.red.500}", _dark: "{colors.red.400}" },
		},
		foreground: {
			value: { base: "{colors.white}", _dark: "{colors.zinc.950}" },
		},
	},
	border: {
		value: { base: "{colors.zinc.200}", _dark: "{colors.zinc.800}" },
	},
	input: {
		value: { base: "{colors.zinc.200}", _dark: "{colors.zinc.800}" },
	},
	ring: {
		value: { base: "{colors.blue.500}", _dark: "{colors.blue.400}" },
	},
})

const borders = defineSemanticTokens.borders({
	base: { value: "1px solid {colors.border}" },
	input: { value: "1px solid {colors.input}" },
	primary: { value: "1px solid {colors.primary}" },
	destructive: { value: "1px solid {colors.destructive}" },
})

export const defaultPreset = definePreset({
	name: "default",
	globalCss: {
		html: {
			background: "background",
			color: "foreground",
		},
	},
	theme: {
		extend: {
			semanticTokens: {
				colors,
				borders,
			},
		},
	},
})

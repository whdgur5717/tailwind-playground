import { sva } from "@styled/css"

export const recipe = sva({
	slots: [
		"root",
		"trigger",
		"portal",
		"overlay",
		"close",
		"content",
		"header",
		"footer",
		"title",
		"description",
	],
	base: {
		overlay: {
			position: "fixed",
			inset: "0",
			bg: "black/90",
		},
		content: {
			bg: "background",
			border: "input",
			borderRadius: "md",
			position: "fixed",
			top: "[50%]",
			left: "[50%]",
			transform: "translate(-50%,-50%)",
			width: "[100%]",
			maxWidth: "[32rem]",
			maxHeight: "[85vh]",
			padding: "4",
			"&[data-state=open]": {
				animationName: "contentShow",
				animationDuration: "slow",
			},

			"&[data-state=closed]": {
				animationName: "fadeOut",
				animationDuration: "slow",
			},
		},
		close: {
			position: "absolute",
			right: "4",
			top: "4",
			rounded: "sm",
			opacity: "0.7",
			transition: "opacity",
			cursor: "pointer",

			_hover: {
				opacity: "1",
			},

			_focus: {
				ringWidth: "1",
				ringColor: "ring",
				ringOffset: "1",
			},

			_disabled: {
				pointerEvents: "none",
			},

			"&[data-state=open]": {
				bg: "accent",
				color: "muted.foreground",
			},
		},
		header: {
			display: "flex",
			flexDirection: "column",
			gap: "1.5",
		},
		footer: {
			display: "flex",
			flexDirection: "column-reverse",
		},
		title: {
			fontSize: "lg",
			fontWeight: "semibold",
			lineHeight: "none",
			letterSpacing: "tight",
		},
		description: {
			fontSize: "sm",
			color: "foreground",
		},
	},
})

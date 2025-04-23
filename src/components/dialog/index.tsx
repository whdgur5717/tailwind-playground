import { createStyleContext } from "@/utils/createStyleContext"
import { css } from "@styled/css"
import { X } from "lucide-react"
import { Dialog } from "radix-ui"
import {
	type ComponentProps,
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
} from "react"

import { recipe } from "./recipe"

const { withRootProvider, withContext } = createStyleContext(recipe)

export const Root = withRootProvider(Dialog.Root)

export const Portal = withRootProvider(Dialog.Portal)
export const Overlay = withContext<
	ComponentRef<typeof Dialog.Overlay>,
	Dialog.DialogOverlayProps
>(Dialog.Overlay, "overlay")

export const Close = withContext<
	ComponentRef<typeof Dialog.Close>,
	Dialog.DialogCloseProps
>(Dialog.Close, "close")

export const ContentPrimitive = forwardRef<
	ComponentRef<typeof Dialog.Content>,
	ComponentPropsWithoutRef<typeof Dialog.Content>
>(({ children, ...props }, ref) => (
	<Portal>
		<Overlay />
		<Dialog.Content ref={ref} {...props}>
			{children}
			<Close>
				<X />
				<span className={css({ srOnly: true })}>Close</span>
			</Close>
		</Dialog.Content>
	</Portal>
))

export const Content = withContext<
	ComponentRef<typeof ContentPrimitive>,
	ComponentProps<typeof ContentPrimitive>
>(ContentPrimitive, "content")

export const Trigger = withContext<
	ComponentRef<typeof Dialog.Trigger>,
	Dialog.DialogTriggerProps
>(Dialog.Trigger, "trigger")

export const Header = withContext<
	HTMLDivElement,
	ComponentPropsWithoutRef<"div">
>("div", "header")

export const Footer = withContext<
	HTMLDivElement,
	ComponentPropsWithoutRef<"div">
>("div", "footer")

export const Title = withContext<
	ComponentRef<typeof Dialog.Title>,
	Dialog.DialogTitleProps
>(Dialog.Title, "title")

export const Description = withContext<
	ComponentRef<typeof Dialog.Description>,
	Dialog.DialogDescriptionProps
>(Dialog.Description, "description")

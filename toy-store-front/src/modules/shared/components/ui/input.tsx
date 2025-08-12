import React from "react";
import { cn } from "../../lib/utils";

export type InputProps = React.ComponentProps<"input"> & {
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	preventIOSZoom?: boolean;
};

export function Input({ className, type, startIcon, endIcon, preventIOSZoom = true, ...props }: InputProps) {
	const isIOS =
		typeof navigator !== "undefined" &&
		(/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

	const inputRef = React.useRef<HTMLInputElement>(null);

	const inputComponent = (
		<input
			ref={inputRef}
			type={type}
			data-slot="input"
			className={cn(
				"typography-body-sm bg-neutral-0 text-foreground border-neutral-20 relative flex h-10 w-full min-w-0 flex-1 rounded-3xl border px-4 py-2.5 outline-none placeholder:text-neutral-50",
				"focus-visible:border-neutral-70 focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-1",
				"aria-invalid:border-negative dark:aria-invalid:border-negative",
				"aria-disabled:bg-muted aria-disabled:text-muted-foreground disabled:bg-neutral-10 disabled:cursor-not-allowed disabled:text-neutral-100/60 aria-disabled:cursor-not-allowed",
				"dark:placeholder:text-neutral-10/30 dark:border-neutral-60 dark:bg-neutral-80",
				isIOS && "focus:border-neutral-40 focus-visible:border-neutral-40 focus:ring-0 focus:outline-none focus-visible:ring-0",
				startIcon && "pl-12",
				endIcon && "pr-12",
				startIcon || endIcon ? "z-0 h-10 w-full" : className,
			)}
			style={{
				fontSize: preventIOSZoom ? "16px" : undefined,
				...(isIOS && {
					WebkitAppearance: "none",
					WebkitTapHighlightColor: "transparent",
					WebkitUserSelect: "text",
				}),
				...(props.style || {}),
			}}
			{...props}
		/>
	);

	if (!startIcon && !endIcon) {
		return inputComponent;
	}

	return (
		<div className={cn("relative h-10 min-w-0", className)}>
			{startIcon && (
				<span className="pointer-events-none absolute top-1/2 left-3 z-10 flex aspect-square h-6 w-6 -translate-y-1/2 items-center justify-center text-neutral-50 [&>svg]:size-4">
					{startIcon}
				</span>
			)}
			{inputComponent}
			{endIcon && (
				<span className="absolute top-1/2 right-3 z-10 flex aspect-square h-6 w-6 -translate-y-1/2 items-center justify-center text-neutral-50 [&>svg]:size-4">
					{endIcon}
				</span>
			)}
		</div>
	);
}

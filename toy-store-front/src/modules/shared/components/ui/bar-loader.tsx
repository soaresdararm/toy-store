"use client";

import * as React from "react";
import { Progress } from "./progress";
import { cn } from "~/modules/shared/lib/utils";

interface BarLoaderProps {
	className?: string;
	message?: string;
	progress?: number;
	animated?: boolean;
	open?: boolean;
	variant?: "fullscreen" | "form-area" | "auto";
}

export function BarLoader({
	className,
	message = "Carregando informações...",
	progress,
	animated = true,
	open = true,
	variant = "auto",
}: BarLoaderProps) {
	const [animatedProgress, setAnimatedProgress] = React.useState(0);

	React.useEffect(() => {
		if (!animated || !open) {
			setAnimatedProgress(0);
			return;
		}

		setAnimatedProgress(1);

		const interval = setInterval(() => {
			setAnimatedProgress((prev) => {
				if (prev >= 95) {
					return 95;
				}
				const increment = Math.max(0.5, Math.random() * 5);
				return Math.min(95, prev + increment);
			});
		}, 100);

		return () => clearInterval(interval);
	}, [animated, open]);

	const displayProgress = progress !== undefined ? progress : animatedProgress;

	const ProgressContent = () => (
		<div className="flex w-full max-w-md flex-col items-center justify-center px-4">
			<div className="w-full max-w-md space-y-4">
				<div className="text-center">
					<p className="text-foreground text-lg font-medium">{message}</p>
				</div>
				<Progress value={Math.round(displayProgress)} className="h-3 w-full" />
			</div>
		</div>
	);

	if (variant === "fullscreen") {
		return (
			<>
				{open && (
					<div className={cn("bg-neutral-0 fixed inset-0 z-50 backdrop-blur-sm", "flex items-center justify-center", className)}>
						<ProgressContent />
					</div>
				)}
			</>
		);
	}

	if (variant === "form-area") {
		return (
			<>
				{open && (
					<div
						className={cn(
							"bg-neutral-0 absolute inset-0 z-50 backdrop-blur-sm",
							"flex items-center justify-center",
							"rounded-3xl",
							className,
						)}
					>
						<ProgressContent />
					</div>
				)}
			</>
		);
	}

	return (
		<>
			{open && (
				<>
					<div
						className={cn(
							"bg-neutral-0 fixed inset-0 z-50 backdrop-blur-sm",
							"flex items-center justify-center",
							"xl:hidden",
							className,
						)}
					>
						<ProgressContent />
					</div>

					<div
						className={cn(
							"bg-neutral-0 absolute inset-0 z-50 backdrop-blur-sm",
							"flex items-center justify-center",
							"rounded-3xl",
							"hidden xl:flex",
							className,
						)}
					>
						<ProgressContent />
					</div>
				</>
			)}
		</>
	);
}

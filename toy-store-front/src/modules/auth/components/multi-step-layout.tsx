"use client";

import Image from "next/image";
import { type ReactNode } from "react";
import { ArrowLeft, TagOutlined } from "~/modules/shared/components/icons";
import { Progress } from "~/modules/shared/components/ui/progress";

type MultiStepLayoutProps = {
	stepLabel?: string;
	title?: string;
	message?: string;
	progress?: number;
	cardIcon?: ReactNode;
	cardLabel?: string;
	children: ReactNode;
	onGoBack?: () => void;
};

export default function MultiStepLayout({
	stepLabel,
	title,
	message,
	progress,
	cardIcon,
	cardLabel,
	children,
	onGoBack,
}: MultiStepLayoutProps) {
	return (
		<div className="bg-background dark:bg-neutral-80 h-full overflow-hidden">
			<div className="mx-auto grid h-dvh w-dvw gap-6 xl:grid-cols-[1fr]">
				<main className="bg-card text-card-foreground relative flex h-full min-h-96 flex-col items-center justify-center gap-8 overflow-auto rounded-3xl px-3 py-8 md:px-8 lg:px-10">
					<div className="bg-neutral-20 relative flex h-full w-full max-w-[600px] flex-col justify-between gap-3 rounded-2xl p-6">
						<div className="flex w-full flex-col gap-8">
							{stepLabel && (
								<>
									<div className="flex items-center gap-2">
										<button type="button" onClick={onGoBack} className="cursor-pointer">
											<ArrowLeft className="text-neutral-60 h-5 w-5" />
										</button>
										<span className="text-neutral-60 text-sm font-medium">Login</span>
									</div>

									{/* Progress*/}
									<div className="flex flex-col gap-3">
										<Progress value={progress} className="h-[14px]" />
										<p className="text-xs font-medium">{stepLabel}</p>
									</div>
								</>
							)}
						</div>

						{/* Form*/}
						<div className="min-w-[280px] flex-1">
							<h1 className="text-xl font-semibold">{title}</h1>
							{children}
						</div>

						<div className="flex w-full pb-8">
							{/* Card Info */}
							{message && (
								<div className="border-muted relative flex w-full items-start rounded-xl border p-3 shadow-sm">
									<>
										<div className="bg-primary absolute top-0 left-0 h-full w-2 rounded-l-xl" />
										<div className="ml-3 flex flex-col gap-1 text-sm">
											<div className="text-primary flex items-start gap-2">
												{cardIcon ?? <TagOutlined />}
												<p>{cardLabel ?? "Informações"}</p>
											</div>
											<p className="pl-2 text-neutral-50">{message}</p>
										</div>
									</>
								</div>
							)}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

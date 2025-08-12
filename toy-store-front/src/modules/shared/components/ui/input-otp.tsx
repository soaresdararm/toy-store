"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon, Eye, EyeOff } from "lucide-react";
import { cn } from "../../lib/utils";

function InputOTP({
	className,
	containerClassName,
	...props
}: React.ComponentProps<typeof OTPInput> & {
	containerClassName?: string;
}) {
	return (
		<OTPInput
			data-slot="input-otp"
			containerClassName={cn("flex items-center gap-2 has-disabled:opacity-50", containerClassName)}
			className={cn("disabled:cursor-not-allowed", className)}
			{...props}
		/>
	);
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="input-otp-group" className={cn("flex items-center gap-3", className)} {...props} />;
}

function InputOTPSlot({
	index,
	className,
	...props
}: React.ComponentProps<"div"> & {
	index: number;
}) {
	const inputOTPContext = React.useContext(OTPInputContext);
	const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

	return (
		<div
			data-slot="input-otp-slot"
			data-active={isActive}
			className={cn(
				"border-neutral-20 flex h-[65px] w-[55px] items-center justify-center rounded-[8px] border bg-white text-2xl shadow-none transition-all outline-none",
				"data-[active=true]:border-primary",
				"aria-invalid:border-negative",
				"relative",
				className,
			)}
			{...props}
		>
			{!char && <div className="bg-neutral-20 absolute bottom-2 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded" />}
			{char}
			{hasFakeCaret && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
				</div>
			)}
		</div>
	);
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
	return (
		<div data-slot="input-otp-separator" role="separator" {...props}>
			<MinusIcon />
		</div>
	);
}

function InputOTPPassword({
	className,
	containerClassName,
	showToggle = true,
	...props
}: React.ComponentProps<typeof OTPInput> & {
	containerClassName?: string;
	showToggle?: boolean;
}) {
	const [visible, setVisible] = React.useState(false);

	return (
		<div className="relative flex w-70 items-center">
			<OTPInput
				{...props}
				render={({ slots }) => (
					<div className={cn("z-0 flex items-center gap-2 has-disabled:opacity-50", containerClassName)}>
						{slots.map((slot, idx) => (
							<div
								key={idx}
								className={cn(
									"relative flex h-[65px] w-[55px] items-center justify-center rounded-[8px] border bg-white text-2xl shadow-none transition-all outline-none",
									"border-neutral-20",
									"data-[active=true]:border-primary",
									"aria-invalid:border-negative",
									className, 
								)}
							>
								<span>{slot.char ? visible ? slot.char : <span className="text-3xl select-none">•</span> : ""}</span>
								{!slot.char && (
									<div className="bg-neutral-20 absolute bottom-2 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded" />
								)}
								{slot.hasFakeCaret && (
									<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
										<div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
									</div>
								)}
							</div>
						))}
					</div>
				)}
				children={undefined}
				data-slot="input-otp"
				className={cn("disabled:cursor-not-allowed", className)}
			/>
			<button
				type="button"
				tabIndex={0}
				className="absolute top-1/2 right-0 z-50 m-0 h-6 w-6 -translate-y-1/2 cursor-pointer p-0"
				onClick={() => setVisible((v) => !v)}
				aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
			>
				{visible ? <EyeOff size={18} /> : <Eye size={18} />}
			</button>
		</div>
	);
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator, InputOTPPassword };


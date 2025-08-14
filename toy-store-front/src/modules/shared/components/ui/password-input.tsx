"use client";

import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./button";
import { Input, type InputProps } from "./input";

export function PasswordInput(props: Omit<InputProps, "type" | "endIcon">) {
	const [showPassword, setShowPassword] = React.useState(false);

	return (
		<>
			<Input
				type={showPassword ? "text" : "password"}
				endIcon={
					<Button
						variant="neutral"
						hierarchy="tertiary"
						size="iconSm"
						className="absolute top-1/2 right-1 size-10 -translate-y-1/2 [&>svg]:size-6"
						type="button"
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? <Eye /> : <EyeOff />}
					</Button>
				}
				{...props}
			/>
		</>
	);
}

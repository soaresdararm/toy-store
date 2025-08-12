"use client";

import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import {
	Controller,
	FormProvider,
	useFormContext,
	useFormState,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { Label } from "~/modules/shared/components/ui/label";
import { cn } from "../../lib/utils";
import { InformationCircle } from "../icons";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
	required?: boolean;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
	required,
	...props
}: ControllerProps<TFieldValues, TName> & { required?: boolean }) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name, required }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState } = useFormContext();
	const formState = useFormState({ name: fieldContext.name });
	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	const { id } = itemContext;
	const isFieldValid = (fieldState.isTouched || fieldState.isDirty) && !fieldState.error;

	return {
		id,
		name: fieldContext.name,
		required: fieldContext.required,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		isFieldValid,
		...fieldState,
	};
};

type FormItemContextValue = {
	id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div data-slot="form-item" className={cn("relative grid gap-2", className)} {...props} />
		</FormItemContext.Provider>
	);
}

/**
 * É uma label
 * @todo: Implementar dot vermelho quando campo for obrigatório
 * @returns
 */
function FormLabel({
	children,
	className,
	showAsterisk = true,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & { showAsterisk?: boolean }) {
	const { error, formItemId } = useFormField();

	return (
		<Label
			data-slot="form-label"
			data-error={!!error}
			htmlFor={formItemId}
			className={cn(
				"typography-label-sm text-foreground data-[error=true]:text-negative",
				showAsterisk && "after:text-red-50 after:content-['*']",
				className,
			)}
			{...props}
		>
			{children}
		</Label>
	);
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
	const { error, formItemId, formDescriptionId, formMessageId, required } = useFormField();

	return (
		<Slot
			data-slot="form-control"
			id={formItemId}
			aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
			aria-invalid={!!error}
			aria-required={required}
			{...props}
		/>
	);
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
	const { formDescriptionId } = useFormField();

	return <p data-slot="form-description" id={formDescriptionId} className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? "") : props.children;

	return (
		<p data-slot="form-message" id={formMessageId} className={cn("text-negative min-h-[1.25rem] text-sm", className)} {...props}>
			{body! || <span className="invisible">placeholder</span>}
		</p>
	);
}

function FormHeader({ className, children, ...props }: React.ComponentProps<"div">) {
	return (
		<div data-slot="form-header" className={cn("flex items-center gap-2 px-2", className)} {...props}>
			{children}
		</div>
	);
}

function FormInfo({ className, children, ...props }: React.ComponentProps<"button">) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className={cn("size-5 [&>svg]:size-3.5", className)}
					data-slot="form-info"
					hierarchy="tertiary"
					type="button"
					size="iconSm"
					variant="neutral"
					{...props}
				>
					<InformationCircle className="size-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent>{children}</PopoverContent>
		</Popover>
	);
}

function FormFooter({ className, children, ...props }: React.ComponentProps<"div">) {
	return (
		<div data-slot="form-footer" className={cn("flex items-center gap-2 px-2", className)} {...props}>
			{children}
		</div>
	);
}

export { Form, FormControl, FormDescription, FormField, FormFooter, FormHeader, FormInfo, FormItem, FormLabel, FormMessage, useFormField };

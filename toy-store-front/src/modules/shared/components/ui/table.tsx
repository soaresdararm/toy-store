"use client";

import * as React from "react";

import { cn } from "~/modules/shared/lib/utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
	return (
		<table
			data-slot="table"
			className={cn("w-full flex-1 caption-bottom", className)} 
			{...props}
		/>
	);
}
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
	return <thead data-slot="table-header" className={cn("[&_tr]:border-neutral-2 [&_tr]:border-b", className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
	return <tbody data-slot="table-body" className={cn("", className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
	return <tfoot data-slot="table-footer" className={cn("dark:bg-neutral-80 font-medium", className)} {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				"hover:bg-muted/50 data-[state=selected]:bg-muted border-neutral-20 border-b transition-colors last:border-b",
				className,
			)}
			{...props}
		/>
	);
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
	return (
		<th
			data-slot="table-head"
			className={cn(
				"text-neutral-50 typography-label-sm h-14 px-4 text-left align-middle whitespace-nowrap  first:rounded-tl-2xl last:rounded-tr-2xl [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	);
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
	return (
		<td
			data-slot="table-cell"
			className={cn(
				"typography-body-sm h-14 px-4 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [tr:last-child_&]:first:rounded-bl-2xl [tr:last-child_&]:last:rounded-br-2xl",
				className,
			)}
			{...props}
		/>
	);
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
	return <caption data-slot="table-caption" className={cn("text-muted-foreground mt-4 text-sm", className)} {...props} />;
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };

import { cn } from "~/modules/shared/lib/utils";

export function AppPage({ className, ...props }: React.ComponentProps<"div">) {
	return <div className={cn("flex h-full flex-col", className)} {...props} />;
}

export function AppPageHeader({
	className,
	title,
	subtitle,
	onBack,
	showBackButton = true,
	rightContent,
	...props
}: React.ComponentProps<"div"> & {
	title?: string;
	subtitle?: string;
	onBack?: () => void;
	showBackButton?: boolean;
	rightContent?: React.ReactNode;
}) {
	return (
		<>
			{/* Desktop Header */}
			<header className={cn("block hidden px-4 py-2", className)} {...props} />
		</>
	);
}

export function AppPageHeaderTitleContainer({ className, ...props }: React.ComponentProps<"div">) {
	return <div className={cn("space-y-1.5", className)} {...props} />;
}

export function AppPageTitle({ className, ...props }: React.ComponentProps<"h1">) {
	return <h1 className={cn("typography-display-md", className)} {...props} />;
}

export function AppPageDescription({ className, ...props }: React.ComponentProps<"p">) {
	return <p className={cn("typography-label-lg", className)} {...props} />;
}

export function AppPageContent({ className, ...props }: React.ComponentProps<"div">) {
	return <div className={cn("flex flex-1 flex-col gap-8 px-4 pb-4 md:px-0 md:pb-0", className)} {...props} />;
}

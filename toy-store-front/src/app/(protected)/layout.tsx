import Header from "./_components/header";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{/* Web layout */}
			<div className="sm:bg-neutral-10/40 bg-neutral-0 hidden h-screen min-w-[300px] flex-col overflow-hidden md:flex">
				<Header />
				<main className="flex-1 overflow-y-auto">{children}</main>
			</div>

			{/* Mobile layout */}
			<div className="overflow-hidden md:hidden">
				<main className="bg-neutral-0 flex-1 overflow-y-auto pb-16">{children}</main>
			</div>
		</>
	);
}

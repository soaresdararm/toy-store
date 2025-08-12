import { cookies } from "next/headers";
import { auth } from "~/modules/auth";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
	const cookieStore = await cookies();
	const session = await auth();

	// if (!session) {
	//   redirect("/");
	// }

	return (
		<>
			{/* Web layout */}
			<div className="sm:bg-neutral-10/40 bg-neutral-0 flex hidden h-screen min-w-[300px] flex-col overflow-hidden">
				<main className="flex-1 overflow-y-auto">{children}</main>
			</div>
		</>
	);
}

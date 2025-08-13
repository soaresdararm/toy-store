"use client";

import { LogOut, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "~/modules/shared/components/icons";
import { Button } from "~/modules/shared/components/ui/button";

export default function Header() {
	const pathname = usePathname();

	return (
		<>
			<header className="bg-neutral-0 border-neutral-10 flex items-center justify-between border-b-2 px-8 py-4">
				<div className="flex justify-between gap-28">
					<div className="flex items-center space-x-4">
						<ShoppingBag />
					</div>

					<div className="hidden items-center gap-8 sm:flex">
						<Link href="/home" className={pathname === "/home" ? "font-medium" : "text-neutral-40"}>
							Inicial
						</Link>
						<Link href="/clientes" className={pathname.startsWith("/clientes") ? "font-medium" : "text-neutral-40"}>
							Clientes
						</Link>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<div className="hidden items-center gap-4 sm:flex">
						<Button variant={"neutral"} size={"icon"}>
							<LogOut />
						</Button>
					</div>
				</div>
			</header>

			<div className="bg-neutral-0 flex items-center justify-between px-9 py-3">
				<div className="flex items-center gap-2">
					<Home />
					<span className="text-neutral-30">/</span>
					{pathname === "/home" && <span className="font-medium">Inicial</span>}
					{pathname !== "/home" && (
						<>
							<Link href="/home" className="text-neutral-40 font-medium">
								Inicial
							</Link>
							<span className="text-neutral-30">/</span>
							<span className="font-medium capitalize">{pathname.replace("/", "")}</span>
						</>
					)}
				</div>
				<div className="font-medium text-gray-500">ToyStore</div>
			</div>
		</>
	);
}

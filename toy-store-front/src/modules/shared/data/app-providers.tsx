"use client";
import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/modules/shared/components/theme-provider";
import { Toaster } from "~/modules/shared/components/ui/sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<TRPCReactProvider>
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
					{children}
				</ThemeProvider>
			</TRPCReactProvider>
			<Toaster />
		</SessionProvider>
	);
}

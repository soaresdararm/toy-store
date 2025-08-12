import "~/styles/globals.css";

import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Funnel_Display, Roboto } from "next/font/google";
import { ThemeProvider } from "~/modules/shared/components/theme-provider";
import { Toaster } from "~/modules/shared/components/ui/sonner";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
	title: "toyStore",
	description: "",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
	openGraph: {
		url: "",
	},
};

const display = Funnel_Display({
	subsets: ["latin"],
	variable: "--display-font",
});

const bodySans = Roboto({
	subsets: ["latin"],
	variable: "--body-font",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="pt-BR" className={`${display.variable} ${bodySans.variable} antialiased`} suppressHydrationWarning>
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
				/>
			</head>
			<body>
				<SessionProvider>
					<TRPCReactProvider>
						<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
							{children}
						</ThemeProvider>
					</TRPCReactProvider>
				</SessionProvider>
				<Toaster />
			</body>
		</html>
	);
}

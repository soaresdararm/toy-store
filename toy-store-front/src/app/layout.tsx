import "~/styles/globals.css";

import { type Metadata } from "next";
import { Funnel_Display, Roboto } from "next/font/google";
import { AppProviders } from "~/modules/shared/data/app-providers";

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
				<AppProviders>{children}</AppProviders>
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "1m25_12",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body>{children}</body>
		</html>
	);
}

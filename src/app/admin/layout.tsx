export default async function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html
			suppressHydrationWarning
			lang="ja"
		>
			<head />
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
}

import SessionWrapper from "@/components/SessionWrapper";
import { ThemeProvider } from "next-themes";
import Navbar from "../../components/Navbar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system">
			<Navbar></Navbar>
			<SessionWrapper>{children}</SessionWrapper>
		</ThemeProvider>
	);
}

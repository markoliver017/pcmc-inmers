import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import WrapperHead from "@/app/components/WrapperHead";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Inmerse",
	description: "Some Description about the project",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className="flex min-h-screen">
					<Sidebar />
					<div className="flex flex-col flex-1">
						<Header />
						<WrapperHead />
						<main className="flex-1 p-4">
							{children}
						</main>
						{/* <Footer /> */}
					</div>
				</div>
			</body>
		</html>
	);
}

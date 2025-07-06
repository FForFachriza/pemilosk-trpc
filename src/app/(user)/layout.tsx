import Navbar from "@/components/navbar";
import type React from "react";

export default function UserLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}

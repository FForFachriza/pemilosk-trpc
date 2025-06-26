import React from "react";
import { LayoutDashboard, UsersRound } from "lucide-react";
import { ToggleTheme } from "@/components/toggle-theme";
import { auth } from "@/server/auth";
import { Toggle } from "@/components/ui/toggle";
import Link from "next/link";

export default async function Navbar() {
	const session = await auth();
	return (
		<nav className="fixed top-0 right-0 left-0 z-50 flex flex-row justify-between bg-white px-8 py-4 shadow-md md:px-16 dark:bg-black">
			<section className="flex flex-row items-center gap-x-2">
				<UsersRound stroke={"#1A56DB"} fill="#1A56DB" />
				<p className="font-bold text-xl normal-case">
					Pemil<span className={"text-primary"}>osk</span>
				</p>
			</section>
			<section className="flex flex-row items-center gap-x-2">
				{session?.user && session.user.role === "ADMIN" && (
					// TODO: Implement Dashboard Admin
					<Link href={"/dashboard"}>
						<Toggle asChild aria-label={"Admin Dashboard"}>
							<LayoutDashboard />
						</Toggle>
					</Link>
				)}
				<ToggleTheme />
			</section>
		</nav>
	);
}

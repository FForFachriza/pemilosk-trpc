import React from "react";
import { UsersRound } from "lucide-react";
import { ToggleTheme } from "@/components/toggle-theme";

export default function Navbar() {
	return (
		<nav className="fixed top-0 right-0 left-0 z-50 flex flex-row justify-between bg-white px-8 py-4 shadow-md md:px-16 dark:bg-black">
			<section className="flex flex-row items-center gap-x-2">
				<UsersRound stroke={"#1A56DB"} fill="#1A56DB" />
				<p className="font-bold text-xl normal-case">
					Pemil<span className={"text-primary"}>osk</span>
				</p>
			</section>
			<section>
				<ToggleTheme />
			</section>
		</nav>
	);
}

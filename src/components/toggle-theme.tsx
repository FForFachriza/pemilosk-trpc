"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";

export function ToggleTheme() {
	const { setTheme, resolvedTheme } = useTheme();

	const handleToggle = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};

	return (
		<Toggle onClick={handleToggle} aria-label="Toggle theme">
			{resolvedTheme === "dark" ? "🌙" : "☀️"}
		</Toggle>
	);
}

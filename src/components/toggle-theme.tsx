"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";

export function ToggleTheme() {
	const { setTheme, theme } = useTheme();

	const handleToggle = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<Toggle onClick={handleToggle} aria-label="Toggle theme">
			{theme === "dark" ? "🌙" : "☀️"}
		</Toggle>
	);
}

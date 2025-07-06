import type React from "react";
import { cn } from "@/lib/utils";

export default function UserContainer({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<main
			className={cn(
				"flex min-h-[calc(100dvh-68px)] items-center justify-center",
				"px-4 pt-20 sm:px-8 lg:px-16",
				"flex-col lg:flex-row",
				className,
			)}
		>
			{children}
		</main>
	);
}

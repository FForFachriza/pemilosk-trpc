"use client";

import { usePathname } from "next/navigation";

export default function useBreadcrumbs() {
	const pathname: string = usePathname();

	return pathname.split("/");
}

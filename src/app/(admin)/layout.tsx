import { AppSidebar } from "@/components/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import type React from "react";
import { ToggleTheme } from "@/components/toggle-theme";
import LinkBreadcrumbs from "@/components/link-breadcrumbs";

export default function Page({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
					<section className="flex items-center gap-2">
						<SidebarTrigger className="-ml-1" />
						<LinkBreadcrumbs />
					</section>
					<ToggleTheme />
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

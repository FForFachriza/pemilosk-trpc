"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import useBreadcrumbs from "@/hooks/use-breadcrumbs";

export default function LinkBreadcrumbs() {
	const breadcrumbs = useBreadcrumbs();

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((item, i) => (
					<React.Fragment key={item}>
						<BreadcrumbItem>
							{breadcrumbs[breadcrumbs.length - 1] === item ? (
								<BreadcrumbPage className={"capitalize"}>{item}</BreadcrumbPage>
							) : (
								<BreadcrumbLink
									className={"capitalize"}
									href={item === "" ? "/" : `/${item}`}
								>
									{item === "" ? "Home" : item}
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
						{i !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

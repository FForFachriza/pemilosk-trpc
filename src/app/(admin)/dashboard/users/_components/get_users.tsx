// GetUsers.tsx
"use client";
import { api } from "@/trpc/react";
import { DataTable } from "@/app/(admin)/dashboard/users/_components/data-table";
import { usersColumns } from "@/app/(admin)/dashboard/users/_components/columns";

export function GetUsers() {
	const [users] = api.user.getUsers.useSuspenseQuery();

	console.log(users);

	return <DataTable columns={usersColumns} data={users} />;
}

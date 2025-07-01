"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";
import type React from "react";
import { Checkbox } from "@/components/ui/checkbox";

type RouterOutput = inferRouterOutputs<AppRouter>;
type User = RouterOutput["user"]["getUsers"];

export const usersColumns: ColumnDef<User[number]>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "nis",
		header: "NIS",
		filterFn: (row, columnId, filterValue) => {
			return String(row.getValue(columnId)).includes(String(filterValue));
		},
	},

	// TODO: Check Voted per Periode
	// {
	// 	accessorKey: "osisVoted",
	// 	header: "OSIS Voted",
	// 	cell: ({ row }) => {
	// 		const chances = row.original.votingChance;
	// 		const hasVoted = chances?.some((vc) => vc.osisVoted);
	//
	// 		return (
	// 			<span
	// 				className={`rounded-full px-2 py-1 text-xs font-medium ${
	// 					hasVoted
	// 						? "bg-green-100 text-green-800"
	// 						: "bg-gray-100 text-gray-800"
	// 				}`}
	// 			>
	// 				{hasVoted ? "Yes" : "No"}
	// 			</span>
	// 		);
	// 	},
	// },
	// {
	// 	accessorKey: "mpkVoted",
	// 	header: "MPK Voted",
	// 	cell: ({ row }) => {
	// 		const chances = row.original.votingChance;
	// 		const hasVoted = chances?.some((vc) => vc.mpkVoted);
	//
	// 		return (
	// 			<span
	// 				className={`rounded-full px-2 py-1 text-xs font-medium ${
	// 					hasVoted
	// 						? "bg-green-100 text-green-800"
	// 						: "bg-gray-100 text-gray-800"
	// 				}`}
	// 			>
	// 				{hasVoted ? "Yes" : "No"}
	// 			</span>
	// 		);
	// 	},
	// },

	{
		accessorKey: "role",
		header: "Role",
		cell: ({ row }) => {
			const role: React.ReactNode = row.getValue("role");
			const color =
				role === "ADMIN"
					? "bg-green-100 text-green-800"
					: role === "MURID"
						? "bg-red-100 text-red-800"
						: "bg-gray-100 text-gray-800";

			return (
				<span className={`rounded-full px-2 py-1 font-medium text-xs ${color}`}>
					{role}
				</span>
			);
		},
	},
];

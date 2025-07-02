"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";
import type React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
type RouterOutput = inferRouterOutputs<AppRouter>;
type User = RouterOutput["user"]["getUsers"];
type Periode = RouterOutput["periode"]["getPeriodes"];

export function createUsersColumns(
	periodes: Periode,
): ColumnDef<NonNullable<User>[number]>[] {
	return [
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
		{
			accessorKey: "osisVoted",
			header: "Check Status Vote",
			cell: ({ row }) => {
				const userVotingChances = row.original.votingChance;
				return (
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline" size="sm">
								Check Status
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-2xl">
							<DialogHeader>
								<DialogTitle>Voting Status - OSIS</DialogTitle>
							</DialogHeader>
							<Accordion type="single" collapsible className="w-full">
								{periodes.map((periode) => {
									const votingChance = userVotingChances?.find(
										(vc) => vc.periodeId === periode.id,
									);

									return (
										<AccordionItem key={periode.id} value={periode.id}>
											<AccordionTrigger>
												<div className="mr-4 flex w-full items-center justify-between">
													<span>{periode.nama}</span>
													<div className="flex gap-2">
														<span
															className={`rounded px-2 py-1 text-xs ${
																votingChance?.osisVoted
																	? "bg-green-100 text-green-800"
																	: "bg-gray-100 text-gray-600"
															}`}
														>
															OSIS:{" "}
															{votingChance?.osisVoted ? "Voted" : "Not Voted"}
														</span>
														<span
															className={`rounded px-2 py-1 text-xs ${
																votingChance?.mpkVoted
																	? "bg-blue-100 text-blue-800"
																	: "bg-gray-100 text-gray-600"
															}`}
														>
															MPK:{" "}
															{votingChance?.mpkVoted ? "Voted" : "Not Voted"}
														</span>
													</div>
												</div>
											</AccordionTrigger>
											<AccordionContent>
												<div className="space-y-2">
													<div className="grid grid-cols-2 gap-4">
														<div className="rounded border p-3">
															<h4 className="font-medium">OSIS Voting</h4>
															<p
																className={`text-sm ${
																	votingChance?.osisVoted
																		? "text-green-600"
																		: "text-gray-500"
																}`}
															>
																Status:{" "}
																{votingChance?.osisVoted
																	? "Sudah Vote"
																	: "Belum Vote"}
															</p>
														</div>
														<div className="rounded border p-3">
															<h4 className="font-medium">MPK Voting</h4>
															<p
																className={`text-sm ${
																	votingChance?.mpkVoted
																		? "text-blue-600"
																		: "text-gray-500"
																}`}
															>
																Status:{" "}
																{votingChance?.mpkVoted
																	? "Sudah Vote"
																	: "Belum Vote"}
															</p>
														</div>
													</div>
												</div>
											</AccordionContent>
										</AccordionItem>
									);
								})}
							</Accordion>
						</DialogContent>
					</Dialog>
				);
			},
		},
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
					<span
						className={`rounded-full px-2 py-1 font-medium text-xs ${color}`}
					>
						{role}
					</span>
				);
			},
		},
	];
}

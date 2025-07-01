"use client";

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
	type ColumnFiltersState,
	getFilteredRowModel,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";
import { parseAsString, useQueryState } from "nuqs";

type RouterOutput = inferRouterOutputs<AppRouter>;
type Periode = RouterOutput["periode"]["getPeriodes"];

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	periode: Periode;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	periode,
}: DataTableProps<TData, TValue>) {
	const [_, setPeriodeId] = useQueryState("periode", parseAsString);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [rowSelection, setRowSelection] = useState({});
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onRowSelectionChange: setRowSelection,
		state: { columnFilters, rowSelection },
	});

	return (
		<div>
			<div className="flex items-center justify-between gap-x-4 py-4 md:gap-x-0">
				<Input
					type="text"
					placeholder="Filter NIS"
					value={(table.getColumn("nis")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("nis")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<Select onValueChange={(val) => setPeriodeId(val)}>
					<SelectTrigger>
						<SelectValue placeholder="Pilih Periode" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={"all"}>All Periode</SelectItem>
						{periode.map(({ nama, id }) => (
							<SelectItem key={id} value={id}>
								{nama}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Data Tidak Ditemukan.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<section className="flex flex-row items-center justify-between">
				<div className="flex-1 text-muted-foreground text-sm">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="flex items-center justify-end space-x-2 py-4">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</section>
		</div>
	);
}

"use client";
import {api} from "@/trpc/react";
import {DataTable} from "@/app/(admin)/dashboard/users/_components/data-table";
import {createUsersColumns} from "@/app/(admin)/dashboard/users/_components/columns";
import {parseAsString, useQueryState} from "nuqs";

export function GetUsers() {
    const [periodeId] = useQueryState("periode", parseAsString);

    const [users] = api.user.getUsers.useSuspenseQuery({
        periodeId: periodeId ?? undefined,
    });

    const [periodes] = api.periode.getPeriodes.useSuspenseQuery();

    const columns = createUsersColumns(periodes);

    return <DataTable columns={columns} periode={periodes} data={users}/>;
}

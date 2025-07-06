import React, { Suspense } from "react";
import { api, HydrateClient } from "@/trpc/server";
import { auth } from "@/server/auth";
import { GetUsers } from "@/app/(admin)/dashboard/users/_components/get_users";
import Loader from "@/components/loader";

export default async function UsersAdmin() {
	const session = await auth();

	if (session?.user) {
		await api.periode.getPeriodes.prefetch();
	}

	return (
		<HydrateClient>
			<Suspense fallback={<Loader />}>{session?.user && <GetUsers />}</Suspense>
		</HydrateClient>
	);
}

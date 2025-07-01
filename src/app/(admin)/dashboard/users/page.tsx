import React, { Suspense } from "react";
import { api, HydrateClient } from "@/trpc/server";
import { auth } from "@/server/auth";
import { GetUsers } from "@/app/(admin)/dashboard/users/_components/get_users";

export default async function UsersAdmin() {
	const session = await auth();

	if (session?.user) {
		await api.user.getUsers.prefetch();
	}

	return (
		<HydrateClient>
			<Suspense fallback={<p>Loading...</p>}>
				{session?.user && <GetUsers />}
			</Suspense>
		</HydrateClient>
	);
}

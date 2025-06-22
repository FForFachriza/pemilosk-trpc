import { db } from "@/server/db";
import type { Role } from "@prisma/client";
import argon from "@node-rs/argon2";

async function main() {
	const dataDummy = [];

	for (let index = 10056; index < 10100; index++) {
		const password = await argon.hash(index.toString());

		dataDummy.push({
			nis: index,
			password: password,
			role: "MURID" as Role,
		});
	}

	await db.user.createMany({
		data: dataDummy,
		skipDuplicates: true,
	});

	console.log(`seeder selesai: ${dataDummy.length} user dibuat.`);
}

main()
	.then(() => process.exit(0))
	.catch((e) => {
		console.error("Seeder gagal:", e);
		process.exit(1);
	});

import { db } from "@/server/db";
import argon from "@node-rs/argon2";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { username, password } = await req.json();

	const user = await db.user.findFirst({
		where: { nis: Number(username) },
	});

	if (!user || !user.password) {
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	}

	const valid = await argon.verify(user.password, password);
	if (!valid) {
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	}

	return NextResponse.json({
		id: user.id,
		nis: user.nis,
		role: user.role,
	});
}

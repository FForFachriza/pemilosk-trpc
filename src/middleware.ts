import { auth } from "@/server/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
	const user = req.auth?.user;

	if (!user) {
		if (req.nextUrl.pathname !== "/auth/login") {
			return NextResponse.redirect(new URL("/auth/login", req.url));
		}
		return NextResponse.next();
	}

	if (user.role !== "ADMIN" && req.nextUrl.pathname.startsWith("/dashboard")) {
		const url = new URL("/", req.url);
		url.searchParams.set("notallowed", "true");
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
});

export const config = {
	matcher: [
		"/((?!_next|api/auth|auth/login|favicon.ico|public).*)",
		"/dashboard/:path*",
	],
};

import { auth } from "@/server/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
	if (!req.auth?.user) {
		if (req.nextUrl.pathname !== "/auth/login") {
			return NextResponse.redirect(new URL("/auth/login", req.url));
		}
	}
	return NextResponse.next();
});

export const config = {
	matcher: ["/((?!_next|api/auth|auth/login|favicon.ico|public).*)"],
};

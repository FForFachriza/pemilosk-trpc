import type { Role } from "@prisma/client";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			nis: number;
			id: string;
			role: Role;
			// ...other properties
		} & DefaultSession["user"];
	}

	interface User {
		// ...other properties
		role: Role;
		nis: number;
	}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
	providers: [
		CredentialsProvider({
			name: "Databases",
			credentials: {
				username: { label: "Username", type: "text", placeholder: "Username" },
				password: { label: "Password", type: "password" },
			},
			async authorize({ username, password }) {
				const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/verify`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username, password }),
				});

				if (!res.ok) {
					return null;
				}

				const user = await res.json();

				return {
					id: user.id,
					nis: user.nis,
					role: user.role,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
				token.nis = user.nis;
			}
			return token;
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					id: token.id as string,
					role: token.role as Role,
					nis: token.nis as number,
				},
			};
		},
		async authorized({ auth }) {
			return !!auth;
		},
	},
	pages: {
		signIn: "/auth/login",
	},
	session: { strategy: "jwt" },
} satisfies NextAuthConfig;

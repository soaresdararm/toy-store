import { type DefaultSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthApi } from "~/modules/auth/data/auth.api";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: number;
			// ...other properties
			// role: UserRole;
		} & DefaultSession["user"];
		accessToken?: string;
	}

	interface User {
		accessToken?: string;
	}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				if (!credentials) return null;
				try {
					const token = await new AuthApi().login({
						email: credentials.email as string,
						password: credentials.password as string,
					});
					if (!token) return null;
					return {
						id: credentials.email,
						email: credentials.email,
						accessToken: token,
					};
				} catch (e) {
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.accessToken;
			}
			return token;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken as string | undefined;
			return session;
		},
	},
};

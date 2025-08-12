import { type DefaultSession, type NextAuthConfig } from "next-auth";
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
export const authConfig = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				login: {},
				password: {},
			},
			async authorize(credentials) {
				const response = await new AuthApi().login({
					login: credentials.login as string,
					password: credentials.password as string,
				});

				// Return both user and token
				return {
					...response.user,
					accessToken: response.token,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			// Persist the access token to the token right after signin
			if (user) {
				token.accessToken = user.accessToken;
			}
			return token;
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token from a provider.
			session.accessToken = token.accessToken as string | undefined;
			return session;
		},
	},
} satisfies NextAuthConfig;

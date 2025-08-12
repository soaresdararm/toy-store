import { z } from "zod";
import { userSchema } from "./user.schema";

export const loginInputSchema = z.object({
	login: z.string({ required_error: "Login é obrigatório" }).min(1, { message: "Login é obrigatório" }),
	password: z.string({ required_error: "Senha é obrigatória" }).min(1, { message: "Senha é obrigatória" }),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const loginResponseSchema = z
	.object({
		token: z.string(),
		managementUser: userSchema,
	})
	.transform(({ token, managementUser }) => ({
		token,
		user: managementUser,
	}));

export type LoginResponse = z.infer<typeof loginResponseSchema>;

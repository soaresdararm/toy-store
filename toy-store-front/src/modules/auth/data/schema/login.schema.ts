import { z } from "zod";
import { userSchema } from "./user.schema";

export const loginInputSchema = z.object({
	email: z.string({ required_error: "Email é obrigatório" }).email("Digite um email válido"),
	password: z.string({ required_error: "Senha é obrigatória" }).min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
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

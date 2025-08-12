import { z } from "zod";

export const userSchema = z
	.object({
		managementUserId: z.number(),
		login: z.string(),
		mail: z.string(),
		status: z.number(),
	})
	.transform(({ managementUserId, ...data }) => ({
		userId: managementUserId,
		email: data.mail,
		login: data.login,
		status: data.status,
	}));

export type User = z.infer<typeof userSchema>;

import * as z from "zod";

export const ClientFormSchema = z.object({
	nomeCompleto: z.string().min(2, "Nome obrigatório"),
	email: z.string().email("E-mail inválido"),
	nascimento: z.string().optional(),
});

export type ClientForm = z.infer<typeof ClientFormSchema>;

export const ClientSchema = ClientFormSchema.extend({
	id: z.number(),
	createdAt: z.string(),
});

export type Client = z.infer<typeof ClientSchema>;

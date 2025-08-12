import { z } from "zod";

export const paginationInputSchema = z.object({
	pageIndex: z.number().default(0),
	pageSize: z.number().default(20),
	search: z.string().nullable().optional(),
	fromDate: z.date().nullable().optional(),
	toDate: z.date().nullable().optional(),
	orderBy: z.string().optional(),
	orderDirection: z.enum(["ASC", "DESC"]).optional(),
});
export type PaginationInputSchema = z.infer<typeof paginationInputSchema>;

export function createPaginatedOutputSchema<T extends z.ZodType>(itemSchema: T) {
	return z.object({
		items: z.array(itemSchema),
		totalItems: z.number(),
	});
}

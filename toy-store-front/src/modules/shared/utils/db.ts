import type { PgTable } from "drizzle-orm/pg-core";

export function isValidColumn<T extends PgTable>(table: T, columnName: string): boolean {
	return columnName in table;
}


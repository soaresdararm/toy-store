import { getConnection } from "../utils/db";

export interface Sale {
  id?: number;
  clientId: number;
  value: number;
  date: Date;
}

export async function getAllSales(): Promise<Sale[]> {
  const pool = await getConnection();
  const result = await pool.query(
    'SELECT id, client_id as "clientId", value, sale_date as "date" FROM sales'
  );
  return result.rows;
}

export async function getSaleById(id: number): Promise<Sale | null> {
  const pool = await getConnection();
  const result = await pool.query(
    'SELECT id, client_id as "clientId", value, sale_date as "date" FROM sales WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export async function createSale(sale: Sale): Promise<number> {
  const pool = await getConnection();
  const result = await pool.query(
    "INSERT INTO sales (client_id, value, sale_date) VALUES ($1, $2, $3) RETURNING id",
    [sale.clientId, sale.value, sale.date]
  );
  return result.rows[0].id;
}

export async function updateSale(
  id: number,
  sale: Partial<Sale>
): Promise<boolean> {
  const pool = await getConnection();
  const result = await pool.query(
    "UPDATE sales SET client_id = $1, value = $2, sale_date = $3 WHERE id = $4",
    [sale.clientId, sale.value, sale.date, id]
  );
  return !!result.rowCount && result.rowCount > 0;
}

export async function deleteSale(id: number): Promise<boolean> {
  const pool = await getConnection();
  const result = await pool.query("DELETE FROM sales WHERE id = $1", [id]);
  return !!result.rowCount && result.rowCount > 0;
}

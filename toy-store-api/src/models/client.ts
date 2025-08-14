import { getConnection } from "../utils/db";

export interface Client {
  id?: number;
  nomeCompleto?: string;
  name: string;
  email: string;
  nascimento: Date;
}

export async function getAllClients(): Promise<Client[]> {
  const pool = await getConnection();
  const result = await pool.query(
    'SELECT id, name as "nomeCompleto", email, nascimento FROM clients'
  );
  return result.rows;
}

export async function getClientById(id: number): Promise<Client | null> {
  const pool = await getConnection();
  const result = await pool.query(
    'SELECT id, name as "nomeCompleto", email, nascimento FROM clients WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export async function createClient(client: Client): Promise<number> {
  const pool = await getConnection();
  const result = await pool.query(
    "INSERT INTO clients (name, email, nascimento) VALUES ($1, $2, $3) RETURNING id",
    [client.name, client.email, client.nascimento]
  );
  return result.rows[0].id;
}

export async function updateClient(
  id: number,
  client: Partial<Client>
): Promise<boolean> {
  const pool = await getConnection();
  const result = await pool.query(
    "UPDATE clients SET name = $1, email = $2, nascimento = $3 WHERE id = $4",
    [client.name, client.email, client.nascimento, id]
  );
  return !!result.rowCount && result.rowCount > 0;
}

export async function deleteClient(id: number): Promise<boolean> {
  const pool = await getConnection();
  const result = await pool.query("DELETE FROM clients WHERE id = $1", [id]);
  return !!result.rowCount && result.rowCount > 0;
}

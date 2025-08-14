import { getConnection } from "../utils/db";

export interface User {
  id?: number;
  email: string;
  password: string;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const pool = await getConnection();
  const result = await pool.query(
    "SELECT id, email, password_hash as password FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0] || null;
}

export async function createUser(user: User): Promise<number> {
  const pool = await getConnection();
  const result = await pool.query(
    "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id",
    [user.email, user.password]
  );
  return result.rows[0].id;
}

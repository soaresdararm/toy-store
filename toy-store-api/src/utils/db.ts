import { Pool } from "pg";

const pool = new Pool({
  user: "toystore_user",
  host: "localhost",
  database: "toystore",
  password: "senha123", // sua senha do pgAdmin
  port: 5432, // padrão do Postgres
});

export async function getConnection() {
  return pool;
}

export { pool };

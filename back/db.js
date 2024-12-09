import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pharma",
  password: "pataki",
  port: 1234,
});

export default pool;

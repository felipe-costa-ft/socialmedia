const { Pool } = require("pg");
export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "social",
  password: "postgres",
  port: "5432",
});

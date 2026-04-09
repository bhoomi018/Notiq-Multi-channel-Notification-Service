import { pool } from "../config/db";

export const getStats = async () => {
  const result = await pool.query(
    "SELECT status, COUNT(*) FROM notifications GROUP BY status"
  );
  return result.rows;
};

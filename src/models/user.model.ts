import { pool } from "../config/db";

export const getPreferences = async (userId: number) => {
  const res = await pool.query(
    "SELECT * FROM user_preferences WHERE user_id=$1",
    [userId]
  );
  return res.rows[0];
};

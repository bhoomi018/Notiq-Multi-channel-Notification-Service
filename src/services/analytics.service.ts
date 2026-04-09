import { pool } from "../config/db";

export const getChannelStats = async () => {
  const res = await pool.query(`
    SELECT channel, status, COUNT(*) 
    FROM notification_logs 
    GROUP BY channel, status
  `);
  return res.rows;
};

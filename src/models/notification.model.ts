import { pool } from "../config/db";

export const createNotification = async (userId: string, message: string) => {
  const result = await pool.query(
    "INSERT INTO notifications(user_id, message, status) VALUES($1,$2,'queued') RETURNING *",
    [userId, message]
  );
  return result.rows[0];
};

export const updateStatus = async (id: string, status: string) => {
  await pool.query(
    "UPDATE notifications SET status=$1 WHERE id=$2",
    [status, id]
  );
};

export const logChannel = async (
  notificationId: number,
  channel: string,
  status: string
) => {
  await pool.query(
    "INSERT INTO notification_logs(notification_id, channel, status) VALUES($1,$2,$3)",
    [notificationId, channel, status]
  );
};

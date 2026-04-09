import { createNotification, updateStatus } from "../models/notification.model";

export const processNotification = async (data: any) => {
  const { userId, message } = data;

  const notification = await createNotification(userId, message);

  try {
    await updateStatus(notification.id, "processing");
    return notification;
  } catch (err) {
    await updateStatus(notification.id, "failed");
    throw err;
  }
};

import { notificationQueue } from "../services/queue.service";
import { sendToUser } from "../websocket/socket";
import { logChannel } from "../models/notification.model";

notificationQueue.process(async (job) => {
  const { notificationId, userId, message, channels } = job.data;

  if (!channels.includes("inapp")) return;

  try {
    sendToUser(userId, message);
    await logChannel(notificationId, "inapp", "delivered");
  } catch (err) {
    await logChannel(notificationId, "inapp", "failed");
  }
});

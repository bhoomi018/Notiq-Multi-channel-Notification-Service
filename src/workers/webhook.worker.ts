import axios from "axios";
import { notificationQueue } from "../services/queue.service";
import { getPreferences } from "../models/user.model";
import { logChannel } from "../models/notification.model";

notificationQueue.process(async (job) => {
  const { notificationId, userId, message, channels } = job.data;

  // channel check
  if (!channels.includes("webhook")) return;

  // user preference check
  const prefs = await getPreferences(userId);
  if (!prefs?.webhook_enabled) return;

  try {
    await axios.post("https://example.com/webhook", { message });

    // success log
    await logChannel(notificationId, "webhook", "delivered");
  } catch (err) {
    console.error("Webhook failed:", err);

    // failure log
    await logChannel(notificationId, "webhook", "failed");

    throw err; 
  }
});

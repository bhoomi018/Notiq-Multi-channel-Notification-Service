import axios from "axios";
import { notificationQueue } from "../services/queue.service";

notificationQueue.process(async (job) => {
  const { message, channels } = job.data;

  if (!channels.includes("webhook")) return;

  try {
    await axios.post("https://example.com/webhook", { message });
  } catch (err) {
    console.error("Webhook failed:", err);
    throw err;
  }
});

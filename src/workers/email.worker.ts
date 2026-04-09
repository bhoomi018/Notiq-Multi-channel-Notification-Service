import { notificationQueue } from "../services/queue.service";
import { transporter } from "../config/mailer";
import { updateStatus } from "../models/notification.model";

notificationQueue.process(async (job) => {
  const { notificationId, message, channels } = job.data;

  if (!channels.includes("email")) return;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "test@example.com",
      subject: "Notification",
      text: message,
    });

    await updateStatus(notificationId, "delivered");
  } catch (err) {
    await updateStatus(notificationId, "failed");
    throw err;
  }
});

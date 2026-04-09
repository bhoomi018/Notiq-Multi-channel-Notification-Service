import { getPreferences } from "../models/user.model";
import { logChannel, updateStatus } from "../models/notification.model";

notificationQueue.process(async (job) => {
  const { notificationId, userId, message, channels } = job.data;

  const prefs = await getPreferences(userId);
  if (!prefs?.email_enabled) return;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "test@example.com",
      subject: "Notification",
      text: message,
    });

    await logChannel(notificationId, "email", "delivered");
    await updateStatus(notificationId, "delivered");
  } catch (err) {
    await logChannel(notificationId, "email", "failed");
    throw err;
  }
});

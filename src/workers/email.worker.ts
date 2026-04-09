import { notificationQueue } from "../services/queue.service";
import { transporter } from "../config/mailer";

notificationQueue.process(async (job) => {
  const { message, channels } = job.data;

  if (!channels.includes("email")) return;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "test@example.com",
      subject: "Notification",
      text: message,
    });
  } catch (err) {
    console.error("Email failed:", err);
    throw err;
  }
});

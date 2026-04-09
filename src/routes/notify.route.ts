import { Router } from "express";
import { notificationQueue } from "../services/queue.service";
import { processNotification } from "../services/delivery.service";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { userId, message, channels } = req.body;

    const notification = await processNotification({ userId, message });

    await notificationQueue.add({
      notificationId: notification.id,
      userId,
      message,
      channels,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed" });
  }
});

export default router;

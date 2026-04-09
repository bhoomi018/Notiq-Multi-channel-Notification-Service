import { Router, Request, Response } from "express";
import { notificationQueue } from "../services/queue.service";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, message, channels } = req.body;

    if (!userId || !message || !channels) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    await notificationQueue.add(
      { userId, message, channels },
      { attempts: 3, backoff: 5000 }
    );

    return res.json({ success: true });
  } catch (error) {
    console.error("Notify error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

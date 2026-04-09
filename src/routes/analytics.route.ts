import { Router } from "express";
import { getStats } from "../services/analytics.service";

const router = Router();

router.get("/channels", async (_, res) => {
  const stats = await getChannelStats();
  res.json(stats);
});

export default router;

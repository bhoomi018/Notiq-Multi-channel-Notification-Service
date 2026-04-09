import { Router } from "express";
import { getStats } from "../services/analytics.service";

const router = Router();

router.get("/", async (_, res) => {
  const stats = await getStats();
  res.json(stats);
});

export default router;

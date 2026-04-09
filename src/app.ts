import express from "express";
import cors from "cors";
import notifyRoute from "./routes/notify.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/notify", notifyRoute);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

export default app;

import Queue from "bull";

export const notificationQueue = new Queue(
  "notifications",
  process.env.REDIS_URL as string
);

notificationQueue.on("failed", (job, err) => {
  console.error(`Job failed ${job.id}:`, err.message);
});

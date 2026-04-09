let io: any;
const userSockets = new Map<number, string>();

export const initSocket = (server: any) => {
  const { Server } = require("socket.io");
  io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket: any) => {
    socket.on("register", (userId: number) => {
      userSockets.set(userId, socket.id);
    });

    socket.on("disconnect", () => {
      userSockets.forEach((value, key) => {
        if (value === socket.id) userSockets.delete(key);
      });
    });
  });
};

export const sendToUser = (userId: number, message: string) => {
  const socketId = userSockets.get(userId);
  if (socketId) {
    io.to(socketId).emit("notification", message);
  }
};

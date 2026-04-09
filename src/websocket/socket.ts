let io: any;

export const initSocket = (server: any) => {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket: any) => {
    const userId = socket.handshake.query.userId;
    socket.join(userId);

    console.log(`User connected: ${userId}`);
  });
};

export const sendToUser = (userId: string, message: string) => {
  if (io) {
    io.to(userId).emit("notification", { message });
  }
};

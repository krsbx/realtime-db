import asyncMw from 'express-asyncmw';
import type { Server, Socket } from 'socket.io';

export const socketIds: string[] = [];

export const assignSocketMw = (io: Server) => {
  let reqSocket: Socket;

  io.on('connection', (socket) => {
    reqSocket = socket;

    if (!socketIds.includes(socket.id)) socketIds.push(socket.id);

    console.log(`Connected w/ ${socket.id}`);

    console.log(`IDs after Connected : ${socketIds}`);

    socket.on('disconnect', () => {
      if (socketIds.includes(socket.id)) {
        const index = socketIds.findIndex((id) => id === socket.id);

        if (index !== -1) socketIds.splice(index, 1);
      }

      socket.disconnect();

      console.log(`Disconnected w/ ${socket.id}`);
      console.log(`IDs after Disonnected : ${socketIds}`);
    });
  });

  return asyncMw(async (req, res, next) => {
    req.io = io;
    req.reqSocket = reqSocket;

    return next();
  });
};

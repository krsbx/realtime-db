import asyncMw from 'express-asyncmw';
import type { Server, Socket } from 'socket.io';

export const assignSocketMw = (io: Server) => {
  let reqSocket: Socket;

  io.on('connection', (socket) => {
    reqSocket = socket;

    console.log(`Connected w/ ${socket.id}`);

    socket.on('disconnect', () => {
      socket.disconnect();

      console.log(`Disconnected w/ ${socket.id}`);
    });
  });

  return asyncMw(async (req, res, next) => {
    req.io = io;
    req.reqSocket = reqSocket;

    return next();
  });
};

declare namespace Express {
  import type { Server, Socket } from 'socket.io';

  interface Request {
    io: Server;
    reqSocket: Socket;
  }
}

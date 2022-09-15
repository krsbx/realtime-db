import { Server } from 'socket.io';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import express from 'express';
import { createServer } from 'http';
import root from './utils/root';

expand(config());

const PORT = process.env.PORT ?? 3001;

const app = express();
const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Server is live @ Port ${PORT}`);
});

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

root(app, io);

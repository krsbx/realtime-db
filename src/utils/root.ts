import { Express } from 'express';
import { Server } from 'socket.io';
import { queryParserMw } from '../middleware/parser';
import { assignSocketMw } from '../middleware/socket';

const root = (app: Express, io: Server) => {
  app.use(queryParserMw);
  app.use(assignSocketMw(io));
};

export default root;

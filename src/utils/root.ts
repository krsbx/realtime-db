import express, { Express } from 'express';
import { Server } from 'socket.io';
import { queryParserMw } from '../middleware/parser';
import { assignSocketMw } from '../middleware/socket';
import userRoutes from '../routes/users';

const root = (app: Express, io: Server) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(queryParserMw);
  app.use(assignSocketMw(io));
  app.use('/users', userRoutes);
};

export default root;

import _ from 'lodash';
import type { Server, Socket } from 'socket.io';
import type { ModelName, AnyRecord } from '../repository/models';
import { socketIds } from '../middleware/socket';
import { SOCKET_METHOD } from './constant';

export const getResourceSocketMethod = (method: string) => {
  switch (method.toUpperCase()) {
    case 'POST':
      return SOCKET_METHOD.CREATE;
    case 'PATCH':
      return SOCKET_METHOD.UPDATE;
    case 'DELETE':
      return SOCKET_METHOD.DELETE;
    default:
      return SOCKET_METHOD.CREATE;
  }
};

export const sendResourceThroughSocket = (
  method: string,
  io: Server,
  socket: Socket,
  resourceName: ModelName,
  resource: AnyRecord
) =>
  Promise.all(
    _.map(socketIds, (socketId) =>
      io.to(socketId).emit('resources-change', {
        method,
        resourceName,
        resource,
      })
    )
  );

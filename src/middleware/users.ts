import asyncMw from 'express-asyncmw';
import _ from 'lodash';
import { ZodError } from 'zod';
import repository from '../repository';
import { MODELS_NAME } from '../repository/models';
import { SOCKETABLE } from '../utils/constant';
import { handleZodError } from '../utils/errors';
import { userSchema } from '../utils/schema';
import { getResourceSocketMethod, sendResourceThroughSocket } from '../utils/socket';

export const createUserMw = asyncMw(async (req, res, next) => {
  try {
    const body = userSchema.create.parse(req.body);
    if (!req.userAuth?.isAdmin) delete body.role;

    const user = await repository.user.resourceToModel(body);

    req.user = await repository.user.create({
      ...user,
      // create a new user including the profiles
      profile: {
        create: {},
      },
    });

    return next();
  } catch (err) {
    if (err instanceof ZodError) {
      return handleZodError(err, res);
    }

    return res.status(500).json({ message: 'Internal server error' });
  }
});

export const updateUserMw = asyncMw(async (req, res, next) => {
  const user = await repository.user.resourceToModel(req.body);

  req.user = await repository.user.update(req.params.id, user);

  return next();
});

export const deleteUserMw = asyncMw(async (req, res) => {
  await repository.user.delete(req.params.id);

  return res.json({
    message: 'User deleted',
  });
});

export const getUserMw = asyncMw(async (req, res, next) => {
  const options = {
    include: {
      profile: true,
    },
  };

  // Get the user from the database base on the id or the username
  const isUsingId = !_.isNaN(+_.get(req, 'params.id'));
  const condition = isUsingId ? { id: +req.params.id } : { username: req.params.id };

  const user = await repository.user.findOne(condition, options);

  if (!user) return res.status(404).json({ message: 'User not found' });

  req.user = user;

  return next();
});

export const getUsersMw = asyncMw(async (req, res, next) => {
  req.users = await repository.user.findAll({}, req.filterQueryParams, req.query);

  return next();
});

export const returnUserMw = asyncMw(async (req, res) => {
  const user = await repository.user.modelToResource(req.user);
  const profile = !_.isEmpty(req.user?.profile)
    ? await repository.profile.modelToResource(req.user.profile)
    : {};

  Object.assign(user, {
    profile,
  });

  if (_.includes(SOCKETABLE, getResourceSocketMethod(req.method) as unknown))
    sendResourceThroughSocket(
      getResourceSocketMethod(req.method)!,
      req.io,
      req.reqSocket,
      MODELS_NAME.USER,
      user
    );

  return res.json({
    ...user,
  });
});

export const returnUsersMw = asyncMw(async (req, res) => {
  return res.json({
    rows: await Promise.all(
      _.map(_.get(req.users, 'rows', []), (user) => repository.user.modelToResource(user))
    ),
    count: _.get(req.users, 'count', 0),
  });
});

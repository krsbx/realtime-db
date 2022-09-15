import _ from 'lodash';
import type { Response } from 'express';
import type { ZodError } from 'zod';

export const handleZodError = (err: ZodError, res: Response) => {
  const errorMessage = _.reduce(
    (err as ZodError).issues,
    (curr, issue) => ({
      ...curr,
      [issue.path[0]]: issue.message,
    }),
    {}
  );

  return res.status(400).json(errorMessage);
};

import z from 'zod';
import { USER_ROLE } from './constant';

export const userSchema = {
  create: z.object({
    password: z.string(),
    email: z.string().email(),
    role: z.enum([USER_ROLE.ADMIN, USER_ROLE.USER]).optional(),
  }),
};

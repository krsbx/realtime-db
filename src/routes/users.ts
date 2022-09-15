import { Router } from 'express';
import * as users from '../middleware/users';

const router = Router();

// POST /users
router.post('/', users.createUserMw, users.returnUserMw);

// GET /users
router.get('/', users.getUsersMw, users.returnUsersMw);

// GET /users/:id
router.get('/:id', users.getUserMw, users.returnUserMw);

// PATCH /users/:id
router.patch('/:id', users.getUserMw, users.updateUserMw, users.getUserMw, users.returnUserMw);

// DELETE /users/:id
router.delete('/:id', users.deleteUserMw);

export default router;

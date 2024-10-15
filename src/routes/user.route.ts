// src/routes/userRoutes.ts

import { Router } from 'express';
import { createUser, getAllUsers, getUserById, loginUser } from '../controllers/user.controller';

const userRouter = Router();

// Route for creating a new user
userRouter.post('/signup', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);

export default userRouter;

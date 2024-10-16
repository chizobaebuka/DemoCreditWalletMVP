// src/routes/userRoutes.ts

import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, loginUser, updateUser } from '../controllers/user.controller';

const userRouter = Router();

// Route for creating a new user
userRouter.post('/signup', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;

// src/routes/userRoutes.ts

import { Router } from 'express';
import { createUser } from '../controllers/user.controller';

const userRouter = Router();

// Route for creating a new user
userRouter.post('/signup', createUser);

export default userRouter;

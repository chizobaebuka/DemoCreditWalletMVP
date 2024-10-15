import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginSchema, signupSchema } from '../utils/validators';
import connection from '../db/database';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = signupSchema.parse(req.body);
        const { name, email, password } = validatedData;

        const existingUser = await connection('users').where({ email }).first();
        if (existingUser) {
            res.status(400).json({ error: 'Email already exists' });
            return; // Exit the function after sending a response
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [newUser] = await connection('users')
            .insert({ name, email, password: hashedPassword })
            .returning('*');

        res.status(201).json(newUser); // Send the new user response
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = loginSchema.parse(req.body);
        const { email, password } = validatedData;

        const user = await connection('users').where({ email }).first();
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // generate jwt token and send it to the user
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: process.env.JWT_EXPIRY as string }
        );
        
        res.status(200).json({ message: 'Login successful', data: user, token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await connection('users').select('*');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Failed to get users' });
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await connection('users').where({ id }).first();
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Failed to get user' });
    }
}
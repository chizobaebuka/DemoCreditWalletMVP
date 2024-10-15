import { Request, Response } from 'express';
import { signupSchema } from '../utils/validators';
import connection from '../db/database';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    console.log('Incoming request body:', req.body); // Log the request body

    try {
        const validatedData = signupSchema.parse(req.body);
        const { name, email, password } = validatedData;

        const existingUser = await connection('users').where({ email }).first();
        if (existingUser) {
            res.status(400).json({ error: 'Email already exists' });
            return; // Exit the function after sending a response
        }

        const [newUser] = await connection('users')
            .insert({ name, email, password })
            .returning('*');

        res.status(201).json(newUser); // Send the new user response
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

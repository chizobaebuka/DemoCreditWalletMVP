import { z } from 'zod'; // Ensure zod is imported

export const signupSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const updateUserSchema = z.object({
    name: z.string().min(2).max(50).optional(),
    email: z.string().email().optional(),
});

export const transferFundsSchema = z.object({
    amount: z.number().positive().gt(0, { message: 'Amount must be greater than 0' }), // Ensure amount is positive
    recipientId: z.string().uuid({ message: 'Recipient ID must be a valid UUID' }), // Ensure recipientId is a valid UUID
});
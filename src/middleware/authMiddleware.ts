import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import connection from '../db/database';

export interface RequestExt extends Request {
    user?: any;
}

export const authMiddleware = async (req: RequestExt, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1]; // Use optional chaining

    if (!token) {
        res.status(401).json({ error: 'No token provided' });
        return;
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: string };

        const user = await connection('users').where({ id: decodedToken.userId }).first();

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        req.user = user;
        console.log('Attached user to request:', req.user); 

        next();
    } catch (error) {
        console.error('Error attaching user:', error);
        res.status(500).json({ error: 'Failed to attach user' });
    }
};

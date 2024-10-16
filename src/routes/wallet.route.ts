import { Router } from 'express';
import { fundWallet, getWallet, transferFunds, withdrawFunds } from '../controllers/wallet.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const walletRouter = Router();

// Route for funding a user's wallet
walletRouter.post('/fund/:id', authMiddleware, fundWallet);
walletRouter.post('/transfer/:id', authMiddleware, transferFunds);
walletRouter.get('/:id', authMiddleware, getWallet);
walletRouter.post('/withdraw/:id', authMiddleware, withdrawFunds);

export default walletRouter;
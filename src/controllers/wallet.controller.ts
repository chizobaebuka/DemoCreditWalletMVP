import { Request, Response } from 'express';
import connection from '../db/database';
import { RequestExt } from '../middleware/authMiddleware';
import { transferFundsSchema } from '../utils/validators';

export const fundWallet = async (req: RequestExt, res: Response): Promise<void> => {
    const { amount } = req.body;
    const id = req.params.id;
    
    if (!amount) {
        res.status(400).json({ error: 'Amount is required' });
        return;
    }

    const userId = id;

    try {
        const wallet = await connection('wallets').where({ user_id: userId }).first();
        if (!wallet) {
            res.status(404).json({ error: 'Wallet not found' });
            return;
        }

        const updatedWallet = await connection('wallets')
            .where({ user_id: userId })
            .update({ balance: connection.raw('balance + ?', [amount]) })
            .returning('*');

        res.status(200).json(updatedWallet);
    } catch (error: any) {
        console.error('Error funding wallet:', error);
        res.status(500).json({ error: 'Failed to fund wallet' });
    }
}

export const transferFunds = async (req: RequestExt, res: Response): Promise<void> => {
    const { amount, recipientId } = transferFundsSchema.parse(req.body);
    const senderId = req.user?.id; 

    console.log('Transfer funds called with:', { amount, recipientId, senderId });

    const trx = await connection.transaction();

    try {
        const senderWallet = await trx('wallets').where({ user_id: senderId }).first();
        if (!senderWallet) {
            res.status(404).json({ error: 'Sender wallet not found' });
            return; 
        }

        const recipientWallet = await trx('wallets').where({ user_id: recipientId }).first();
        if (!recipientWallet) {
            res.status(404).json({ error: 'Recipient wallet not found' });
            return;
        }

        if (senderWallet.balance < amount) {
            res.status(400).json({ error: 'Insufficient balance' });
            return;
        }

        await trx('wallets')
            .where({ user_id: senderId })
            .update({ balance: trx.raw('balance - ?', [amount]) });

        await trx('wallets')
            .where({ user_id: recipientId })
            .update({ balance: trx.raw('balance + ?', [amount]) });

        await trx.commit(); 

        const updatedSenderWallet = await connection('wallets').where({ user_id: senderId }).first();
        const updatedRecipientWallet = await connection('wallets').where({ user_id: recipientId }).first();

        res.status(200).json({ sender: updatedSenderWallet, recipient: updatedRecipientWallet });
    } catch (error: any) {
        await trx.rollback(); 
        console.error('Error transferring funds:', error);
        res.status(500).json({ error: 'Failed to transfer funds' });
    }
};

export const getWallet = async (req: RequestExt, res: Response): Promise<void> => {
    const userId = req.user?.id;

    try {
        const wallet = await connection('wallets').where({ user_id: userId }).first();
        if (!wallet) {
            res.status(404).json({ error: 'Wallet not found' });
            return;
        }

        res.status(200).json({
            message: 'Wallet successfully retrieved for the user',
            data: wallet
        });
    } catch (error: any) {
        console.error('Error getting wallet:', error);
        res.status(500).json({ error: 'Failed to get wallet' });
    }
};

export const withdrawFunds = async (req: RequestExt, res: Response): Promise<void> => {
    const { amount } = req.body;
    const userId = req.user?.id;
    
    if (!amount ||  amount <= 0) {
        res.status(400).json({ error: 'Invalid Amount' });
        return;
    }

    try {
        const wallet = await connection('wallets').where({ user_id: userId }).first();
        if (!wallet) {
            res.status(404).json({ error: 'Wallet not found' });
            return;
        }

        if (wallet.balance < amount) {
            res.status(400).json({ error: 'Insufficient balance' });
            return;
        }

        await connection('wallets')
            .where({ user_id: userId })
            .update({ balance: connection.raw('balance -?', [amount]) });

        res.status(200).json({
            message: 'Funds withdrawn successfully',
            wallet
        });
    } catch (err: any) {
        console.error('Error withdrawing funds:', err);
        res.status(500).json({ error: 'Failed to withdraw funds' });
    }
}
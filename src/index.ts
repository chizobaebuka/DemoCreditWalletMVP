import express from 'express';
import Knex from 'knex';
import dotenv from 'dotenv';
import { config } from './knexfile';
import userRouter from './routes/user.route';

// Load environment variables
dotenv.config();

// Set up environment and Knex configuration
const environment = process.env.NODE_ENV || 'development';
const knexConfig = config[environment];
const knex = Knex(knexConfig); // Initialize Knex

const app = express();
app.use(express.json()); // Middleware for parsing JSON

// Routes
app.use('/api/v1/auth', userRouter);

knex.raw('select 1+1')
   .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });

const config = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '1234',
        database: process.env.DB_NAME || 'credit_wallet_db',
        port: process.env.DB_PORT || 5432,
    },
};

const connection = knex(config);

export default connection;
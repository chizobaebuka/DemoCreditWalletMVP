import { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '1234',
      database: process.env.DB_NAME || 'credit_wallet_db',
      port: parseInt(process.env.DB_PORT || '5432', 10),
    },
    migrations: {
      directory: path.join(__dirname, 'db/migrations'), // Absolute path to src/db/migrations
    },
    seeds: {
      directory: path.join(__dirname, 'db/seeds'), // Absolute path to src/db/seeds
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, '../dist/db/migrations'), // Path for production
    },
    seeds: {
      directory: path.join(__dirname, '../dist/db/seeds'), // Path for production
    },
  },
};

export default config;

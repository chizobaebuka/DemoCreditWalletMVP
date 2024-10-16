import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    // Enable the uuid-ossp extension
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    
    await knex.schema.createTable('wallets', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()')); // Unique ID for the wallet
        table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE'); // Foreign key to the users table
        table.decimal('balance', 15, 2).defaultTo(0); // Wallet balance with precision (15 digits, 2 decimals)
        table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp when wallet is created
        table.timestamp('updated_at').defaultTo(knex.fn.now()); // Timestamp for last update
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('wallets'); // Drop the table if it exists
}

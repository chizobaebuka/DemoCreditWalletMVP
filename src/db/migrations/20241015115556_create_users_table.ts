import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // Enable the uuid-ossp extension
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    // Create the users table
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.boolean('blacklisted').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users');
}

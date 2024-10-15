// src/models/userModel.ts

import { Knex } from 'knex';
import connection from '../db/database';
import { IUser } from '../interfaces/user.interface';

// Define the UserModel class
export class UserModel {
    private knex: Knex;

    constructor(knexInstance: Knex) {
        this.knex = knexInstance;
    }

    // Create a new user
    public async createUser(userData: Omit<IUser, 'id' | 'created_at' | 'updated_at'>): Promise<IUser> {
        const [newUser] = await this.knex('users')
            .insert({ ...userData, created_at: this.knex.fn.now(), updated_at: this.knex.fn.now() })
            .returning('*'); // Return the created user
        return newUser;
    }

    // Get all users
    public async getAllUsers(): Promise<IUser[]> {
        return await this.knex('users').select('*');
    }

    // Get user by ID
    public async getUserById(id: string): Promise<IUser | undefined> {
        return await this.knex('users').where({ id }).first();
    }

    // Update user
    public async updateUser(id: string, userData: Partial<Omit<IUser, 'id'>>): Promise<IUser | undefined> {
        const [updatedUser] = await this.knex('users')
            .where({ id })
            .update({ ...userData, updated_at: this.knex.fn.now() })
            .returning('*');
        return updatedUser;
    }

    // Delete user
    public async deleteUser(id: string): Promise<number> {
        return await this.knex('users').where({ id }).del();
    }
}

// Create an instance of UserModel for exporting
const userModel = new UserModel(connection);
export default userModel;

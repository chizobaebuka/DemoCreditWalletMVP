export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    blacklisted: boolean;
    created_at: Date;
    updated_at: Date | null;
}
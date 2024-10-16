export interface ICore {
    id: string;
    created_at: Date;
    updated_at: Date | null;
}

export interface IUser extends ICore {
    name: string;
    email: string;
    password: string;
    blacklisted: boolean;
    created_at: Date;
}

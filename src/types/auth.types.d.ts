import User from "../models/Ueser";

// type AdminUser = User & { role: 'admin' };
// type Status = 'active' | 'inactive' | 'pending';
// type ApiResponse = User | Error;

export interface CreateUserParams {
    loginId: string;
    firstName?: string;
    lastName?: string;
    photo?: string;
    password?: string;
    publicKey?: string;
};

export interface TokenPayload {
    token: string;
    user: User
}
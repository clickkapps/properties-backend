import User from "../models/Ueser";

// type AdminUser = User & { role: 'admin' };
// type Status = 'active' | 'inactive' | 'pending';
// type ApiResponse = User | Error;

export interface CreateUserParams {
    role?: 'agent' | 'admin' | "guest";
    loginId: string;
    loginIdType?: 'phone' | 'email';
    firstName?: string;
    lastName?: string;
    photo?: string;
    password?: string,
    contactEmail?: string
    contactPhone?: string
}

export interface TokenPayload {
    token: string;
    user: User
}
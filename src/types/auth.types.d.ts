import User from "../models/Ueser";

export type CreateUserParams = {
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
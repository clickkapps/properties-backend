import {CreateUserParams, TokenPayload} from "../types/auth.types";
import jwt from "jsonwebtoken";
import moment from "moment";
import User from "../models/User";
import {autoCreateUser} from "./user.trait";

export const generateAccessTokenFromLoginId = async (args: CreateUserParams) => {

    // create user if it doesn't exist
    const user = await  autoCreateUser(args)

    await user.update({
        currentLoginAt: moment(),
        lastLoginAt: user.currentLoginAt
    });

    const appKey = process.env.APP_KEY;
    const token = jwt.sign({ id: user.id, loginId: user.loginId, publicKey: user.publicKey  }, appKey || '');

    const tokenPayload: TokenPayload = {
        token: token,
        user: user
    }

    return tokenPayload

}
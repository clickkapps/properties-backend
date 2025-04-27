import {CreateUserParams, TokenPayload} from "../types/auth.types";
import {generateKey, hashPassword} from "../helpers/utils";
import jwt from "jsonwebtoken";
import moment from "moment";
import User from "../models/User";

export const generateAccessTokenFromLoginId = async (args: CreateUserParams) => {

    // create user if it doesn't exist

    const publicKey = generateKey()
    const secreteKey = generateKey()
    // const hashedPassword = await hashPassword(args.password || secreteKey);
    const [user, created] = await User.findOrCreate({
        where: {
            loginId: args.loginId,
        },
        defaults: {
            role: args.role,
            firstName: args.firstName,
            lastName: args.lastName,
            photo: args.photo,
            publicKey: publicKey,
            secreteKey: secreteKey,
            contactEmail: args.loginIdType == 'email' ? args.loginId : undefined,
            contactPhone: args.loginIdType == 'phone' ? args.loginId : undefined,
        }
    })

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
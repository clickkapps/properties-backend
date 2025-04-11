import {NextFunction, Request, Response} from "express";
import googleOAuth2, {VerifyCallback} from "passport-google-oauth2";
import {generateAccessTokenFromLoginId} from "../traits/auth.trait";
import jwt from "jsonwebtoken";
import User from "../models/User";

const GoogleStrategy = googleOAuth2.Strategy;

export const useGoogleStrategy = new GoogleStrategy({
        clientID:     process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: `${process.env['APP_URL'] || ''}/auth/google/callback`,
        passReqToCallback   : true
    },  (req: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback)=>  {
        // console.log("req => ", profile);
        // console.log("accessToken => ", accessToken);
        // console.log("refreshToken => ", refreshToken);
        // profile.email, profile['given_name'], profile['family_name'], profile['picture']
        generateAccessTokenFromLoginId( { loginId: profile['email'],
            loginIdType: 'email',
            firstName: profile['given_name'], lastName: profile['family_name'] })
            .then((tokenPayload) => { done(null, tokenPayload);})

    }
)


export const isAuthenticated =  (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Authentication required" });
        return
    }
    //
    const token = authHeader.split(" ")[1]
    // verify a token symmetric - synchronous
    const appKey = process.env.APP_KEY || '';
    try {

        console.log("isAuthenticated method called")
        const decoded = jwt.verify(token, appKey);
        const user = decoded as User;
        console.log("decoded => ", user)
        req.user = user
        next()

    }catch(err) {

        res.status(401).json({ message: "Invalid authentication token" });

    }

}


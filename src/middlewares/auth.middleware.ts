import {Request} from "express";
import googleOAuth2, {VerifyCallback} from "passport-google-oauth2";
import {generateAccessTokenFromLoginId} from "../traits/auth.trait";

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
        generateAccessTokenFromLoginId( { loginId: profile['email'], firstName: profile['given_name'], lastName: profile['family_name'] })
            .then((tokenPayload) => { done(null, tokenPayload);})

    }
)


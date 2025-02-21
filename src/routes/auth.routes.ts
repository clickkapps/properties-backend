import { Router, Request, Response, NextFunction } from 'express'
import passport from "passport";
import googleOAuth2 from "passport-google-oauth2";
import User from "../models/user.model";

declare module "express-serve-static-core" {
    interface Request {
        token?: String;
    }
}

const GoogleStrategy = googleOAuth2.Strategy;

passport.use(new GoogleStrategy({
        clientID:     process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: `${process.env['APP_URL'] || ''}/auth/google/callback`,
        passReqToCallback   : true
    },
    function(req: Request, accessToken: String, refreshToken: String, profile: any, done: any) {
        // console.log("req => ", profile);
        console.log("accessToken => ", accessToken);
        // console.log("refreshToken => ", refreshToken);
        req.token = accessToken
        createNewUser(profile.email, profile['given_name'], profile['family_name'], profile['picture']).then(credentials => {
            done(null, credentials);
        })
    }
));


const router = Router()

// Google authentication
router.get('/google', passport.authenticate('google', { scope: [ 'email', 'profile' ] }));
router.get('/google/callback', passport.authenticate( 'google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
}));

router.get("/google/success", function(req: Request | any, res: Response, next: NextFunction) {
    console.log("token", req.session.passport)
    res.json({ token: req.token})
})


// Serializers
passport.serializeUser(function(user: any, done) {
    done(null, user);
});

passport.deserializeUser(function(user: any, done) {
    done(null, user);
});

const createNewUser = async (loginId: String, firstName?: String, lastName?: String, photo?: String) => {
    const user = await User.create({
        loginId: loginId,
        firstName: firstName,
        lastName: lastName,
        photo: photo,
    });
    return {
        token: "123344352444",
        user: user,
    }
}

export default router
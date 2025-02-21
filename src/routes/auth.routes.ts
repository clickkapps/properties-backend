import { Router, Request, Response, NextFunction } from 'express'
import passport from "passport";
import googleOAuth2 from "passport-google-oauth2";

const GoogleStrategy = googleOAuth2.Strategy;

passport.use(new GoogleStrategy({
        clientID:     process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: `${process.env['APP_URL'] || ''}/auth/google/callback`,
        passReqToCallback   : true
    },
    function(request: any, accessToken: any, refreshToken: any, profile: any, done: any) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
        // console.log("request => ", request);
        console.log("profile => ", profile);
        console.log("accessToken => ", accessToken);
        console.log("refreshToken => ", refreshToken);

        done(null, profile);
    }
));


const router = Router()

// Google authentication
router.get('/google', passport.authenticate('google', { scope: [ 'email', 'profile' ] }));
router.get('/google/callback', passport.authenticate( 'google', {
    successRedirect: '/google/success',
    failureRedirect: '/google/failure'
}));

// Serializers
passport.serializeUser(function(user: any, done) {
    done(null, user);
});

passport.deserializeUser(function(user: any, done) {
    done(null, user);
});


export default router
import { Router } from 'express'
import passport from "passport";
import {
    getAuthenticationCompleted,
    getGoogleAuthentication,
    getGoogleCallback
} from "../controllers/auth.controller";
import {useGoogleStrategy} from "../middlewares/auth.middleware";


const router = Router()

passport.use(useGoogleStrategy);
// passport Serializers
passport.serializeUser(function(user: Express.User, done) { done(null, user); });
passport.deserializeUser(function(user: Express.User, done) { done(null, user);});

// Google authentication
router.get('/google', getGoogleAuthentication);
router.get('/google/callback', getGoogleCallback);

router.get("/success", getAuthenticationCompleted);







export default router
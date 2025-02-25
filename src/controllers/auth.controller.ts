import passport from "passport";
import { Request, Response } from "express";

export const getGoogleAuthentication =  passport.authenticate('google', { scope: [ 'email', 'profile' ] })
export const getGoogleCallback = passport.authenticate( 'google', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
})

export const getAuthenticationCompleted = (req: Request, res: Response) => {
    const passportInfo = req.session
    // passportInfo.
    console.log("passportInfo", passportInfo.passport)
    if(!passportInfo){
        res.status(401).send({error: "Authentication failed"});
        return;
    }

    res.json({ token: req.session.passport })
}


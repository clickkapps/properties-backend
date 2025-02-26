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

    const webAppUrl = process.env.WEB_APP_URL || '';
    if(!(passportInfo?.passport)){
        res.redirect(`${webAppUrl}?auth=failed`);
        return;
    }

    const token = passportInfo.passport?.user.token
    res.redirect(`${webAppUrl}/login?auth=success&token=${token}`);
}



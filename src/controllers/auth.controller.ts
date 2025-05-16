import passport from "passport";
import {NextFunction, Request, Response} from "express";
import {comparePassword, generateKey, generateRandomCode, hashPassword} from "../helpers/utils";
import {ApiResponse} from "../types/shared.types";
import OTP from "../models/OTP";
import {Op} from "sequelize";
import moment from "moment";
import { generateAccessTokenFromLoginId } from "../traits/auth.trait";
import User from "../models/User";
import PasswordAttempt from "../models/PasswordAttempt";
import passwordAttempt from "../models/PasswordAttempt";
import {autoCreateUser} from "../traits/user.trait";

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
    res.redirect(`${webAppUrl}/login?oauth=success&token=${token}`);
}


export const requestPhoneAuthentication = async (req: Request, res: Response, next: NextFunction) => {

   try {

       const { phone } = req.body;
       console.log("request: ", phone )

       let apiResponse: ApiResponse

       if (!phone) {
           res.status(403).send({ message: 'Invalid request '})
           return;
       }

       // return if previous otp sent is less than 3 minutes
       const existingOTP = await OTP.findOne({
           where: {
               phone: phone,
               status: 'pending',
               createdAt: {
                   [Op.gte]: moment().subtract(3, 'minutes')
               }
           }
       })

       if(existingOTP) {
           apiResponse = { message: "Verification code already sent to email", data:{
                   serverId: existingOTP.serverId,
                   phone: existingOTP.phone,
                   isNew: false
               }
           }
           res.status(200).send(apiResponse)
           return;
       }


       // generate and send verification code to phone number
       const otp = generateRandomCode(6)
       const serverId = generateKey()

       await OTP.update({
           status: 'cancelled',
       },{
           where: {
               phone: phone,
               status: 'pending',
               createdAt: {
                   [Op.gte]: moment().subtract(3, 'minutes')
               }
           }
       })

       // send otp to phone number provided
       const otpCreated = await OTP.create({
           phone: phone,
           serverId: serverId,
           code: await hashPassword(otp)
       })
       console.log("otp", otp)

       apiResponse = { message: "Verification code sent to email", data:{
               serverId: otpCreated.serverId,
               phone: otpCreated.phone,
               isNew: true
           }
       }
       res.status(200).send(apiResponse)

   }catch(err) {
       next(err)
   }

}

export const verifyPhoneAuthentication = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { code, phone, serverId } = req.body;
        let apiResponse: ApiResponse

        // return if previous otp sent is less than 3 minutes
        let otp = await OTP.findOne({
            where: {
                phone: phone,
                serverId: serverId,
                status: 'pending'
            }
        })

        if (!otp) {
            apiResponse = { message: "Invalid request" }
            res.status(403).send(apiResponse)
            return
        }

        // check if the number of attempts are more than 3
        if(otp.attempts >= 3) {
            await otp.update({ status: 'cancelled' })
            apiResponse = { message: `You have exceeded the maximum number of attempts` }
            res.status(403).send(apiResponse)
            return;
        }

        const isValid = await comparePassword(code, otp.code ?? '')

        if(!isValid) {

            otp = await otp.update({ attempts: otp.attempts + 1 })
            const attemptsRemaining = 4 - otp.attempts
            apiResponse = { message: `Invalid verification code. ${attemptsRemaining} attempt${attemptsRemaining > 1 ? 's' : ''} remaining` }
            res.status(403).send(apiResponse)
            return

        }

        await otp.update({ status: 'verified' })

        const tokenPayload = await generateAccessTokenFromLoginId({
            loginId: phone,
            loginIdType: 'phone'
        })

        apiResponse = { message: "Verified", data: tokenPayload.token }
        res.status(200).send(apiResponse)

    }catch (error) {
        next(error)
    }

}


export const postPasswordAuthentication = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { loginId, password } = req.body;
        const { role } =  req.query
        console.log("request: ", loginId )

        if (!loginId || !password) {
            res.status(400).send({ message: 'Invalid request '})
            return;
        }

        const userRole = role as string || "admin";

        const user = await User.findOne({
            where: {
                loginId: loginId
            }
        })

        if (!user) {
            res.status(403).send({ message: 'Invalid request '})
            return;
        }

        // if password is not set
        if (!user.password) {
            res.status(403).send({ message: 'Invalid request '})
            return;
        }

        if(user.role !== userRole) {
            res.status(403).send({ message: 'Invalid request '})
            return;
        }

        const previousAttempt = await PasswordAttempt.findOne({
            where: {
                userId: user.id
            }
        })

        // user cannot login again if numer of attempts exceed 3
        if (previousAttempt) {

            if(previousAttempt.attempts >= 3) {
                res.status(403).send({ message: 'Number of password attempts exceeded'})
                return;
            }

        }

        const isValid = await comparePassword(password, user.password)

        const [ attempted, _ ] = await PasswordAttempt.findOrCreate({
            where: { userId: user.id },
            defaults: {
                attempts: 0,
            },
        })

        if(!isValid) {

            await attempted.update({
                attempts: attempted.attempts + 1,
            })

            const attemptsRemaining = 4 - (attempted.attempts === 0 ? 1 : attempted.attempts)
            res.status(403).send({ message: `Invalid credentials. ${attemptsRemaining} attempt${attemptsRemaining > 1 ? 's' : ''} remaining` })
            return

        }

        await attempted.update({ attempts: 0 })

        const tokenPayload = await generateAccessTokenFromLoginId({
            loginId: loginId,
            loginIdType: 'email'
        })

        res.status(200).send({ data: tokenPayload.token })


    }catch(err) {
        next(err)
    }

}



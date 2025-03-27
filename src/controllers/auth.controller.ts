import passport from "passport";
import { Request, Response } from "express";
import {comparePassword, generateKey, generateRandomCode} from "../helpers/utils";
import {ApiResponse} from "../types/shared.types";
import OTP from "../models/OTP";
import {Op} from "sequelize";
import moment from "moment";
import {generateAccessTokenFromLoginId} from "../traits/auth.trait";

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


export const requestPhoneAuthentication = async (req: Request, res: Response) => {

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
                otp: existingOTP.phone,
                isNew: false
            }
        }
        res.status(200).send(apiResponse)
        return;
    }

    // generate and send verification code to phone number
    const otp = generateRandomCode(6)
    const serverId = generateKey()

    // send otp to phone number provided
    const otpCreated = await OTP.create({
        phone: phone,
        serverId: serverId,
    })
    console.log("otp", otp)

    apiResponse = { message: "Verification code sent to email", data:{
            serverId: otpCreated.serverId,
            otp: otpCreated.phone,
            isNew: true
        }
    }
    res.status(200).send(apiResponse)

}

export const verifyPhoneAuthentication = async (req: Request, res: Response) => {
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
        apiResponse = { message: "You have exceeded the maximum number of attempts"}
        res.status(403).send(apiResponse)
        return;
    }

    const isValid = await comparePassword(code, otp.code ?? '')

    if(!isValid) {

        otp = await otp.update({ attempts: otp.attempts + 1 })
        apiResponse = { message: `Invalid verification code. ${3 - otp.attempts} attempts remaining` }
        res.status(403).send(apiResponse)
        return

    }

    await otp.update({ status: 'verified' })

    const tokenPayload = await generateAccessTokenFromLoginId({
        loginId: phone,
    })

    apiResponse = { message: "Verified", data: tokenPayload }
    res.status(200).send(apiResponse)


}



import {NextFunction, Request, Response} from "express";
import User from "../models/User";
import {calculateBillingPrice, createSubscription, verifyPayment} from "../traits/subscription.trait.";
import moment from "moment";
import https from "https";

export const getBill = async(req: Request, res: Response, next: NextFunction) => {

    const { packageSlug, startDate, endDate } = req.body

    try {

        const bill = await calculateBillingPrice({
            packageSlug: packageSlug,
            startDate,
            endDate,
        })

        res.status(200).json({data: bill })

    }catch (error) {
        next(error);
    }
}


export const postProcessSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { startDate, endDate, packageSlug, propertyId } = req.body;

        const user = req.user as User
        let actualStartDate: string
        let actualEndDate: string
        const payload: Record<string, any> = {
            userId: user.id,
        }

        if (packageSlug === "basic_package") {
            actualStartDate = moment().toISOString()
            actualEndDate = moment().add(70, 'years').toISOString()
        }
        else if (packageSlug === "standard_package") {
            actualStartDate = moment().toISOString()
            actualEndDate = moment().add(70, 'years').toISOString()
        }
        else if(packageSlug === "properties_promotion") {

            if(!startDate || !endDate) {
                res.status(400).send({message: "Invalid request"})
                return
            }

            actualStartDate = startDate
            actualEndDate = endDate
            if(propertyId) {
                payload["propertyId"] = propertyId
            }

        }
        else if (packageSlug === "advertisement") {

            if(!startDate || !endDate) {
                res.status(400).send({message: "Invalid request"})
                return
            }

            actualStartDate = startDate
            actualEndDate = endDate

        }
        else {
            res.status(400).send({message: "Invalid service type"})
            return
        }

        const { amountToPay, frequency, currency } = await calculateBillingPrice({
            packageSlug: packageSlug,
            startDate: actualStartDate,
            endDate: actualEndDate,
        })


        const subscription = await createSubscription(user, {
            userId: user.id,
            packageSlug: packageSlug,
            subscriptionType: frequency,
            amountPayable:  amountToPay,
            currency: currency,
            payload: JSON.stringify(payload),
        })

        res.status(200).json({ message: "subscription initiated successfully", data: subscription })


    }catch (error) {
        next(error);
    }
}

export const checkSubscriptionStatus = async (req: Request, res: Response, next: NextFunction) => {

    const reference = req.params.reference as string

    if (!reference) {
        res.status(400).json({ error: 'Missing reference in query params' })
        return
    }

    try {

        const responseData = await verifyPayment(reference)
        res.status(200).json({ data: responseData })

    } catch (error) {
        next(error)
    }
}

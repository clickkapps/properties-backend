import {NextFunction, Request, Response} from "express";
import User from "../models/User";
import {calculateBillingPrice, createSubscription} from "../traits/subscription.trait.";
import moment from "moment";

export const getBill = async(req: Request, res: Response, next: NextFunction) => {

    const { serviceType, startDate, endDate } = req.body

    try {

        const bill = await calculateBillingPrice({
            serviceType: serviceType,
            startDate,
            endDate,
        })

        res.status(200).json({data: bill })

    }catch (error) {
        next(error);
    }
}


export const postInitiateSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { startDate, endDate, serviceType } = req.body;

        const user = req.user as User
        let actualStartDate: string
        let actualEndDate: string

        if (serviceType === "basic_package") {
            actualStartDate = moment().toISOString()
            actualEndDate = moment().add(70, 'years').toISOString()
        }
        if (serviceType === "standard_package") {
            actualStartDate = moment().toISOString()
            actualEndDate = moment().add(70, 'years').toISOString()
        }
        if(serviceType === "properties_promotion") {

            if(!startDate || !endDate) {
                res.status(400).send({message: "Invalid request"})
                return
            }

            actualStartDate = startDate
            actualEndDate = endDate

        }
        if (serviceType === "advertisement") {

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


        const { amountToPay, frequency } = await calculateBillingPrice({
            serviceType: serviceType,
            startDate: actualStartDate,
            endDate: actualEndDate,
        })

        const subscription = await createSubscription({
            userId: user.id,
            serviceType: serviceType,
            subscriptionType: frequency,
            amountPayable:  amountToPay,
        })

        res.status(200).json({ message: "subscription initiated successfully", data: subscription })


    }catch (error) {
        next(error);
    }
}

import {CreateSubscriptionPayload, UpdateSubscriptionPayload} from "../types/subscription.types";
import Subscription from "../models/Subscription";
import User from "../models/User";
import moment from "moment";
import Package from "../models/Package";

type BillingPriceParams = {
    serviceType: "properties_promotion" | "advertisement" | "basic_package" | "standard_package";
    startDate?: string,
    endDate?: string,
}

export const calculateBillingPrice = async (args: BillingPriceParams): Promise<{amountToPay: number, frequency: "daily"|"one_time"}> => {

    if(args.serviceType === "basic_package") {
        const pkg = await Package.findOne({
            where: {
                group: "default",
                slug: "basic",
            }
        })
        if (!pkg || !pkg.price || !pkg.frequency) {
            throw new Error("Invalid package")
        }
        return {
            amountToPay: pkg.price,
            frequency: pkg.frequency,
        }
    }

    if(args.serviceType === "standard_package") {
        const pkg = await Package.findOne({
            where: {
                group: "default",
                slug: "standard",
            }
        })
        if (!pkg || !pkg.price || !pkg.frequency) {
            throw new Error("Invalid package")
        }
        return {
            amountToPay: pkg.price,
            frequency: pkg.frequency,
        }
    }

    if(args.serviceType === "properties_promotion") {

        if(!args.startDate || !args.endDate) {
            throw new Error("Invalid date range");
        }

        const diffInDays = moment(args.startDate).diff(moment(args.endDate), "days");

        const pkg = await Package.findOne({
            where: {
                group: "properties_promotion",
                slug: "properties_promotion",
                frequency: "daily"
            }
        })

        if(!pkg || !pkg?.price) {
            //  not expected to happen
            throw new Error("Invalid package selected");
        }

        const totalPrice = pkg.price * diffInDays;
        return {
            amountToPay: totalPrice,
            frequency: "daily"
        }

    }

    if(args.serviceType === "advertisement") {

        if(!args.startDate || !args.endDate) {
            throw new Error("Invalid date range");
        }

        const diffInDays = moment(args.startDate).diff(moment(args.endDate), "days");

        const pkg = await Package.findOne({
            where: {
                group: "advertisement",
                slug: "advertisement",
                frequency: "daily"
            }
        })

        if(!pkg || !pkg?.price) {
            //  not expected to happen
            throw new Error("Invalid package selected");
        }

        const totalPrice = pkg.price * diffInDays;
        return {
            amountToPay: totalPrice,
            frequency: "daily"
        }
    }


    throw new Error("Invalid service type");

}


export const createSubscription = async (payload: CreateSubscriptionPayload, sendInvoice: boolean = true) => {

    // create subscription
    // we use findOrCreate so that we can use this same method to RESEND invoice for the subscription
    const subscription = await Subscription.findOrCreate({
        where: {
            userId: payload.userId,
            serviceType: payload.serviceType,
            status: 'pending'
        },
        defaults: {
            ...payload
        }
    },)

    if(sendInvoice) {
        // send invoice to user
        const user = User.findByPk(payload.userId)
    }

    return subscription

}

export const updateSubscription = async (id: number, payload: UpdateSubscriptionPayload) => {

    // create subscription
    await Subscription.update({
        ...payload
    }, {
        where: {
            id: payload.id
        }
    })

}



import {CreateSubscriptionPayload, UpdateSubscriptionPayload} from "../types/subscription.types";
import Subscription from "../models/Subscription";
import User from "../models/User";
import moment from "moment";
import Package from "../models/Package";
import {generateKey} from "../helpers/utils";
import https from "https";
import axios from 'axios'
import {sendInvoice} from "./notifications.trait";

type BillingPriceParams = {
    packageSlug: "properties_promotion" | "advertisement" | "basic_package" | "standard_package";
    startDate?: string,
    endDate?: string,
}

export const calculateBillingPrice = async (args: BillingPriceParams): Promise<{amountToPay: number, frequency: "daily"|"one_time", currency: string | undefined}> => {

    if(args.packageSlug === "basic_package") {
        const pkg = await Package.findOne({
            where: {
                group: "entitlement",
                slug: "basic",
            }
        })
        if (!pkg || !pkg.price || !pkg.frequency) {
            throw new Error("Invalid package")
        }
        return {
            amountToPay: pkg.price,
            frequency: pkg.frequency,
            currency: pkg.currency
        }
    }

    if(args.packageSlug === "standard_package") {
        const pkg = await Package.findOne({
            where: {
                group: "entitlement",
                slug: "standard",
            }
        })
        if (!pkg || !pkg.price || !pkg.frequency) {
            throw new Error("Invalid package")
        }
        return {
            amountToPay: pkg.price,
            frequency: pkg.frequency,
            currency: pkg.currency
        }
    }

    if(args.packageSlug === "properties_promotion") {

        if(!args.startDate || !args.endDate) {
            throw new Error("Invalid date range");
        }

        const diffInDays = Math.abs(moment(args.endDate).diff(moment(args.startDate), "days"));

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
            frequency: "daily",
            currency: pkg.currency
        }

    }

    if(args.packageSlug === "advertisement") {

        if(!args.startDate || !args.endDate) {
            throw new Error("Invalid date range");
        }

        const diffInDays = Math.abs(moment(args.endDate).diff(moment(args.startDate), "days"));

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
            frequency: "daily",
            currency: pkg.currency
        }
    }

    if (args.packageSlug === "property_showing") {

        const pkg = await Package.findOne({
            where: {
                group: "property_showing",
                slug: "property_showing",
            }
        })

        if(!pkg || !pkg?.price || !pkg.frequency) {
            //  not expected to happen
            throw new Error("Invalid package selected");
        }

        return {
            amountToPay: pkg.price,
            frequency: pkg.frequency,
            currency: pkg.currency
        }

    }


    throw new Error("Invalid service type");

}


export const createSubscription = async (args: CreateSubscriptionPayload) => {

    const serverId = generateKey()
    // create subscription
    const subscription = await Subscription.create({
        ...args,
        userId: args.user.id,
        serviceType: args.packageSlug,
        status: 'pending',
        serverId: serverId,
    },)

    if(args.useInvoice) {
        // send invoice to user
        // const user = User.findByPk(args.userId)
        sendInvoice({ userId: args.user.id, subscriptionId: subscription.id}).then()
    }

    // const checkoutPayload = await generatePaymentCheckout(user, subscription)
    // const existingSubPld = subscription.payload ? JSON.parse(subscription.payload) : { }
    // let checkoutUrl = undefined
    // if(checkoutPayload && checkoutPayload.data) {
    //     existingSubPld.paystackCheckoutPayload = checkoutPayload.data
    //     checkoutUrl = checkoutPayload.data['authorization_url']
    //
    // }
    // await subscription.update({
    //     payload: JSON.stringify(existingSubPld),
    // })

    return {
        subscriptionId: subscription.id,
        reference: subscription.serverId,
        amount: (subscription.amountPayable || 0) * 100,
        email: args.user.contactEmail || process.env.AMIN_DEFAULT_EMAIL,
        pk: process.env.PAYMENT_PUBLIC_KEY,
        currency: subscription.currency
    }

}

export const verifyPayment = async (reference: string) => {

    const response = await axios.get(`${process.env.PAYMENT_BASE_URL}/transaction/verify/${reference}`, {
        headers: {
            Authorization: `Bearer ${process.env.PAYMENT_SECRET_KEY}`,
            'Content-Type': 'application/json'
        },
    })

    const responseData = await response.data

    if(responseData && responseData.data) {

        const subscription = await Subscription.findOne({
            where: {
                serverId: reference,
                status: "pending"
            }
        })

         await subscription?.update({
            status: responseData.data.status,
            amountPaid: responseData.data.status === "success" ? subscription.amountPayable : subscription.amountPaid,
         })

        return {
            status: responseData.data.status,
            subId: subscription?.id,
            extra: subscription?.payload ? JSON.parse(subscription.payload) : undefined,
        }

    }

    return {
        status: "unknown"
    }

}

const generatePaymentCheckout = async (user: User, subscription: Subscription) => {

    const postData = JSON.stringify({
        email: user.contactEmail || process.env.AMIN_DEFAULT_EMAIL,
        amount: (subscription.amountPayable || 0) * 100,
        reference: subscription.serverId,
        metadata: {
            "cancel_action": process.env.WEB_APP_URL
        }
    })

    const options = {
        hostname: process.env.PAYMENT_HOSTNAME,
        port: process.env.PAYMENT_PORT,
        path: process.env.PAYMENT_PATH,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.PAYMENT_SECRET_KEY}`,
            'Content-Type': 'application/json'
        }
    }

    return await new Promise<any>((resolve, reject) => {
        const req = https.request(options, res => {
            let data = ''

            res.on('data', chunk => {
                data += chunk
            })

            res.on('end', () => {
                try {
                    resolve(JSON.parse(data))
                } catch (err) {
                    reject(err)
                }
            })
        })

        req.on('error', err => reject(err))
        req.write(postData)
        req.end()
    })
}



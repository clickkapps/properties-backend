import {CreateSubscriptionPayload, UpdateSubscriptionPayload} from "../types/subscription.types";
import Subscription from "../models/Subscription";
import User from "../models/User";

export const createSubscription = async (payload: CreateSubscriptionPayload, sendInvoice: boolean = true) => {

    // create subscription
    // we use findOrCreate so that we can use this same method to RESEND invoice for the subscription
    await Subscription.findOrCreate({
        where: {
            userId: payload.userId,
            serviceType: payload.serviceType,
            status: 'active'
        },
        defaults: {
            ...payload
        }
    },)

    if(sendInvoice) {
        // send invoice to user
        const user = User.findByPk(payload.userId)
    }

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
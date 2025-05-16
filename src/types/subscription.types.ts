import User from "../models/User";

export interface CreateSubscriptionPayload {
    user: User
    packageSlug: "properties_promotion" | "advertisement" | "basic_package" | "standard_package" | "property_showing",
    subscriptionType?: "one_time" | "daily",
    amountPayable?: number,
    currency?: string
    payload?: string,
    useInvoice?: boolean
}

export type UpdateSubscriptionPayload = {
    id?: number,
    userId?: number,
    status?: string,
    amountPaid?: number,
    startDate?: Date,
    endDate?: Date,
}
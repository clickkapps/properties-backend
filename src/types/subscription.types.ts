export interface CreateSubscriptionPayload {

    userId: number,
    serviceType: "properties_promotion" | "advertisement",
    subscriptionType?: string,
    amountPayable?: number
}

export type UpdateSubscriptionPayload = {
    id: number,
    userId: number,
    status?: string,
    amountPaid?: number,
    startDate?: Date,
    endDate?: Date,
}
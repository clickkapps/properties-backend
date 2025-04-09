export interface CreateSubscriptionPayload {

    userId: number,
    serviceType: string,
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
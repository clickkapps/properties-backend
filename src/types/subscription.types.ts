export interface CreateSubscriptionPayload {

    userId: number,
    packageSlug: "properties_promotion" | "advertisement" | "basic_package" | "standard_package",
    subscriptionType?: string,
    amountPayable?: number,
    currency?: string
    payload?: string
}

export type UpdateSubscriptionPayload = {
    id?: number,
    userId?: number,
    status?: string,
    amountPaid?: number,
    startDate?: Date,
    endDate?: Date,
}
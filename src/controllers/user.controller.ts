import {NextFunction, Request, Response} from "express";
import User from "../models/User";
import {ApiResponse} from "../types/shared.types";
import moment from "moment";
import UserEntitlement from "../models/UserEntitlement";
import Subscription from "../models/Subscription";

export const getBasicInfo = async (req: Request, res: Response) => {
    const userId = (req.user as User).id
    const user = await User.findByPk(userId, {
        include: [{
            association: 'activeEntitlement',
        }]
    })
    let apiResponse: ApiResponse
    if(!user) {
        apiResponse = { message: "User not found"};
        res.status(404).json(apiResponse)
        return;
    }

    apiResponse = { data: user  };
    res.status(200).json( apiResponse )
}

export const updateBasicInfo = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const user = (req.user as User)
        const userId = user.id
        const updated = await User.update({
            firstName: req.body.firstName || user.firstName,
            lastName: req.body.lastName || user.lastName,
            photo: req.body.photo,
            contactEmail: req.body.contactEmail || user.contactEmail,
            contactPhone: req.body.contactPhone || user.contactPhone,
            basicInfoUpdatedAt: moment(),
            companyName: req.body.companyName || user.companyName,
            companyLocation: req.body.companyLocation || user.companyLocation,
            role: req.body.role || user.role || 'agent',
        }, {
            where: {
                id: userId
            }
        })
        console.log("updated", updated)
        const apiResponse: ApiResponse = {
            message: "Profile updated",
            data: updated
        }
        res.status(200).json(apiResponse)

    }catch(err){

        next(err)

    }
}

// same as membership
export const updateUserEntitlement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { entitlement, subscriptionId } = req.body;
        const user = (req.user as User)

        const subscription = await Subscription.findByPk(subscriptionId)
        if(!subscription) {
            res.status(400).json({message: "Invalid request"})
            return
        }

        // disable all previous entitlements
        await UserEntitlement.update({
            status: "inactive",
        },{
            where: {
                userId: user.id,
            }
        })

        // enable the current one
       await UserEntitlement.findOrCreate({
           where: {
               userId: user.id,
               entitlement: entitlement,
               status: "active"
           },
           defaults: {
               subscriptionId: subscriptionId,
               entitlementAmountPaid: String(subscription.amountPaid),
               currency: subscription.currency,
           }
       })

        res.status(200).json({
            message: "Entitlement updated!",
        })

    }catch(err){
        next(err)
    }
}
import {NextFunction, Request, Response} from "express";
import User from "../models/User";
import {ApiResponse} from "../types/shared.types";
import moment from "moment";
import UserEntitlement from "../models/UserEntitlement";
import Subscription from "../models/Subscription";
import {autoCreateUser} from "../traits/user.trait";
import Permission from "../models/Permission";
import {defineAbilitiesFor} from "../helpers/defineAbility";

export const getBasicInfo = async (req: Request, res: Response) => {

    const { uid, loginId } = req.query // pass uid as query param if you want to update a different user
    const creator = (req.user as User)
    let userId = creator.id
    if(uid) {
        userId = +uid
    }

    const options = {
        include: [{
            association: 'activeEntitlement',
        }, {
            association: 'permissions',
        }]
    }

    const user = loginId ? await User.findOne({
        where: { loginId: loginId },
        include: options.include
    }) : await User.findByPk(userId, options)

    let apiResponse: ApiResponse
    if(!user) {
        apiResponse = { message: "User not found"};
        res.status(404).json(apiResponse)
        return;
    }

    const ability = defineAbilitiesFor(user);
    let rolePermissionId = 0
    const rolePermissions = ability.rules.map((rule, index) => {
        --rolePermissionId
        return ({
            id: rolePermissionId,
            userId: user.id,
            verb: rule.inverted ? 'cannot' : 'can',
            action: rule.action,
            subject: rule.subject
        });
    })

    const userJson = user.toJSON()
    userJson.permissions = [...userJson.permissions, ...rolePermissions]

    apiResponse = { data: userJson  };
    res.status(200).json( apiResponse )
}

export const updateBasicInfo = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const creator = (req.user as User)
        const { uid } = req.query // pass uid as query param if you want to update a different user
        let user = creator
        if(uid) {
            const userToUpdate = await User.findByPk(uid)
            if(userToUpdate) {
                user = userToUpdate
            }
        }

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
                id: user.id
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

// as it stands now, only admin can create another user
export const postAutoCreateUser = async (req: Request, res: Response, next: NextFunction) => {

    const { userFirstName, userLastName, contactPhone, contactEmail, role } = req.body;

    const creator = (req.user as User)
    if (!creator) {
        res.status(400).json({message: "Invalid request"})
        return
    }

    if(creator.role !== "admin"){
        res.status(400).json({message: "Invalid request"})
        return
    }

    if(!contactPhone || !userFirstName){
        res.status(400).send({ message: "Invalid request"})
        return
    }

    const user = await autoCreateUser({
        loginId: contactPhone,
        firstName: userFirstName,
        lastName: userLastName,
        loginIdType: "phone",
        contactEmail: contactEmail,
        role: role,
    })

    res.status(200).send({ data: user })

}
import {NextFunction, Request, Response} from "express";
import User from "../models/User";
import {ApiResponse} from "../types/shared.types";
import moment from "moment";

export const getBasicInfo = async (req: Request, res: Response) => {
    const userId = (req.user as User).id
    const user = await User.findByPk(userId)
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
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            photo: req.body.photo,
            contactEmail: req.body.contactEmail,
            contactPhone: req.body.contactPhone,
            basicInfoUpdatedAt: moment(),
            companyName: req.body.companyName,
            companyLocation: req.body.companyLocation,
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

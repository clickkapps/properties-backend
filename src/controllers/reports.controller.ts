import {NextFunction, Request, Response} from "express";
import {ApiResponse} from "../types/shared.types";
import Property from "../models/Property";
import User from "../models/User";

export const getUserAnalytics = async(req: Request, res: Response, next: NextFunction) => {

    const userId = (req.user as User).id
    const data: {publishedPropertiesCount?: number}  = {}

    try {

        // Published properties
        data['publishedPropertiesCount'] = await Property.count({
            where: {
                userId: userId,
                published: true
            }
        })

        // Property views
        // const propertyViewsCount = await

        // Advertisements
        const apiResponse: ApiResponse = {
            data,
            message: "success"
        }

        res.status(200).send(apiResponse);

    }catch (e) {
        next(e)
    }
}
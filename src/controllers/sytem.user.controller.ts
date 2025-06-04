import {NextFunction, Request, Response} from "express";
import User from "../models/User";

export const getSystemIndexInfo = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const supportUser = await User.findOne({
            where: {
                loginId: "support_442"
            },
            attributes: [
                'contactEmail',
                'contactPhone',
                'contactRegion',
                'contactAddress',
                'contactCountry',
                'companyName',
                'companyLocation'
            ] // only return these columns
        })

        const userJson = supportUser?.toJSON()
        res.status(200).json( { data: {
                support: userJson
        } } )

    }catch (error) {
        next(error)
    }

}
import {NextFunction, Request, Response} from "express";
import {ApiResponse} from "../types/shared.types";
import FeatureView from "../models/FeatureView";
import {col, fn, sql, Op} from "@sequelize/core";
import where = sql.where;


export const setFeatureView = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const  { id, feature } = req.body


        const [record, created] = await FeatureView.findOrCreate({
            where: {
                [Op.and]: [
                    { feature: feature },
                    { id: id },
                    where(fn('DATE', col('createdAt')), Op.eq, fn('CURRENT_DATE'))
                ]
            },
            defaults: {
                dailyViews: 1,
                feature: feature
            }
        });

        // if record already exist by increasing the number of views
        if(!created) {
            await record.update({
                dailyViews: (record.dailyViews || 1) + 1
            })
        }

        const apiResponse: ApiResponse = {
            message: "success"
        }
        res.status(200).json(apiResponse)


    }catch (error) {
        next(error);
    }

}

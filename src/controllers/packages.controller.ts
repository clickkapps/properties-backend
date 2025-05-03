import {Request, Response} from "express";
import Package from "../models/Package";
import {ApiResponse} from "../types/shared.types";

export const getPackages = async(req: Request, res: Response) => {

    const { group } = req.query;

    const where: any = {}
    if(group) {
        if(group !== "all"){
            where["group"] = group
        }
    }else  {
        where["group"] = "entitlement"
    }

    const packages = await Package.findAll({
        where: where,
    })
    const apiResponse: ApiResponse = {
        data: packages
    }
    res.status(200).send(apiResponse);
}
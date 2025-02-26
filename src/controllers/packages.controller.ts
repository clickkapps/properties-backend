import {Request, Response} from "express";
import Package from "../models/Package";
import {ApiResponse} from "../types/shared.types";

export const getPackages = async(req: Request, res: Response) => {

    const packages = await Package.findAll()
    const apiResponse: ApiResponse = {
        data: packages
    }
    res.status(200).send(apiResponse);
}
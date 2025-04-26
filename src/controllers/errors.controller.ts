import {Request, Response, NextFunction} from "express";
import {ApiResponse} from "../types/shared.types";

export const get404 = (req: Request, res: Response, next: NextFunction) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
    const apiResponse: ApiResponse = { message: "Path not found", data : req.url}
    res.status(404).json(apiResponse)
}

export const get500 = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log("error stack: ", error.stack)
    const apiResponse: ApiResponse = { message: error.message, data : req.url}
    res.status(error.status || 500).json(apiResponse)
}
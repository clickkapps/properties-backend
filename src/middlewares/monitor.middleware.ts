import {NextFunction, Request, Response} from "express";

export const logIncomingRequests = (req: Request, res: Response, next: NextFunction) => {
    console.log("logIncomingRequests url:",req.url);
    console.log("logIncomingRequests body",req.body);
    next()
}
import {NextFunction, Request, Response} from "express";

export const logIncomingRequests = (req: Request, res: Response, next: NextFunction) => {
    console.log("logIncomingRequests",req.body);
    next()
}
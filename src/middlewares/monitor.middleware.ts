import {NextFunction, Request, Response} from "express";

export const logIncomingRequests = (req: Request, res: Response, next: NextFunction) => {
    console.log("request body:", req.body)
}
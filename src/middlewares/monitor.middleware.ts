import {NextFunction, Request, Response} from "express";

export const logIncomingRequests = (req: Request, res: Response, next: NextFunction) => {
    console.log("logIncomingRequests url:",req.url);
    console.log("logIncomingRequests origin:",req.headers.origin);
    console.log("logIncomingRequests method:",req.method.toUpperCase());
    console.log("logIncomingRequests query:",req.query);
    console.log("logIncomingRequests params:",req.params);
    console.log("logIncomingRequests body",req.body);
    next()
}
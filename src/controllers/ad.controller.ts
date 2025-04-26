import {NextFunction, Request, Response} from "express";
import {storage} from "../helpers/storage";
import User from "../models/User";
import {ApiResponse} from "../types/shared.types";

export const createProperty = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const creatorId = (req.user as User).id
        let apiResponse: ApiResponse

        const {
            startDate,
            endDate,
            contactPhone,
            contactEmail,
            link,
        } = req.body

        if(!startDate || !endDate) {
            apiResponse = { message: "Invalid request" };
            res.status(400).send(apiResponse)
            return;
        }

        const files = req.files as {
            [fieldName: string]: Express.Multer.File[];
        };

        const image = files?.mainImage?.[0];

        let mainImagePath
        // upload main image and get path
        if(image) {
            const mainImageOriginalName = image?.originalname
            const uploadedFile = await storage.putFile({ body: image?.buffer, fileName: mainImageOriginalName} )
            mainImagePath = `${uploadedFile.generatedFilePath}?mimeType=${uploadedFile.mimeType}`
        }



    }catch (error) {
        next(error)
    }

}
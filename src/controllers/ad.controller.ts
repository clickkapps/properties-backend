import {NextFunction, Request, Response} from "express";
import {storage} from "../helpers/storage";
import Advertisement from "../models/Advertisement";
import User from "../models/User";

export const postNewAdvertisement = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const user = req.user as User

        const {
            subscriptionId,
            startDate,
            endDate,
            contactPhone,
            contactEmail,
            link,
        } = req.body

        if(!startDate || !endDate || !subscriptionId) {
            res.status(400).send({ message: "Invalid request" })
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

        await Advertisement.create({
            userId: user.id,
            status: "active",
            subscriptionId: subscriptionId,
            startFrom: startDate,
            endAt: endDate,
            contactPhone: contactPhone,
            contactEmail: contactEmail,
            imagePath: mainImagePath,
            link: link,
        })

        res.status(200).send({message: "Advertisement successfully created"})

    }catch (error) {
        next(error)
    }

}
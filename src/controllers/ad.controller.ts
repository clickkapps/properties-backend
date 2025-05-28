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

        if(!startDate || !endDate || !subscriptionId || !contactPhone) {
            res.status(400).send({ message: "Invalid request" })
            return;
        }

        const file = req.file as (Express.Multer.File | undefined);

        let mainImagePath
        // upload main image and get path
        if(file) {
            const mainImageOriginalName = file?.originalname
            const uploadedFile = await storage.putFile({ body: file?.buffer, fileName: mainImageOriginalName} )
            mainImagePath = `${uploadedFile.generatedFilePath}?mimeType=${uploadedFile.mimeType}`
        }

        await Advertisement.create({
            userId: user.id,
            status: "pending",
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

export const getUserAdvertisement = async(req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User
    const ads = await Advertisement.findAll({
        where: {
            userId: user.id,
        },
        order: [['createdAt', 'DESC']],
    })

    const transformed = ads.map((ad) => {
        if(ad.imagePath) {
            const split = ad.imagePath.split("/")
            // const folder = split[0]
            ad.imagePath = split[1]
        }
        return ad
    })

    res.status(200).send({data: transformed})
}

export const getPublicAdvertisement = async(req: Request, res: Response, next: NextFunction) => {

    const ads = await Advertisement.findAll({
        where: {
            status: "active",
            startDate: {
                // [] startDate has began
            }
        }
    })
    const transformed = ads.map((ad) => {
        if(ad.imagePath) {
            const split = ad.imagePath.split("/")
            // const folder = split[0]
            ad.imagePath = split[1]
        }

        return ad

    })
    res.status(200).send({data: transformed})
}
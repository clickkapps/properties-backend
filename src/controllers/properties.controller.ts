import User from "../models/User";
import {Request, Response} from "express";
import {ApiResponse} from "../types/shared.types";
import Property from "../models/Property";

export const createProperty = async(req: Request, res: Response) => {
    const creatorId = (req.user as User).id
    const creator = await User.findByPk(creatorId)

    let apiResponse: ApiResponse

    // userId here is the person this property belongs to
    // creatorId is the one adding the property to the system

    const { userId, propertyCategoryId,
        title, description, specifications, mainImagePath,
        offerType, price,
        otherImagePaths
    } = req.body
    if(!title || !description || !specifications || !mainImagePath || !propertyCategoryId) {
        apiResponse = { message: "Invalid request" };
        res.status(400).send(apiResponse)
        return;
    }

    // create the property
    const created = await Property.create({
        propertyCategoryId,
        userId: userId || creatorId,
        creatorId: creatorId,
        title,
        description,
        mainImagePath,
        offerType,
        price
    })

    // create the image gallery

    // create the specification


    apiResponse = { message: "Property created successfully!", data: created };
    res.status(200).json(apiResponse)
}
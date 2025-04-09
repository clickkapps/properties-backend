import User from "../models/User";
import {NextFunction, Request, Response} from "express";
import {ApiResponse} from "../types/shared.types";
import Property from "../models/Property";
import PropertySpecification from "../models/PropertySpecification";
import {storage} from "../helpers/storage";
import PropertyGallery from "../models/PropertyGallery";
import {slugify} from "../helpers/utils";
import PropertyCategory from "../models/PropertyCategory";


//  Property section
export const createProperty = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const creatorId = (req.user as User).id

        let apiResponse: ApiResponse

        // userId here is the person this property belongs to
        // creatorId is the one adding the property to the system

        const files = req.files as {
            [fieldName: string]: Express.Multer.File[];
        };

        const mainImage = files?.mainImage?.[0];
        const otherImages = files?.otherImages || [];

        const { userId, propertyCategoryId,
            title, description, specifications,
            offerType, price
        } = req.body
        if(!title || !description || !specifications || !propertyCategoryId) {
            apiResponse = { message: "Invalid request" };
            res.status(400).send(apiResponse)
            return;
        }


        // upload main image and get path
        const uploadedFile = await storage.putFile(mainImage?.buffer)
        // const mainImageOriginalName = mainImage?.originalname
        const mainImageMime = mainImage?.mimetype
        const mainImagePath = `${uploadedFile.generatedFilePath}?mimeType=${mainImageMime}`

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
        const imagesToInsert: { propertyId: number, path: string }[] = []

        // const
        const uploadOtherImages = otherImages.map((image: Express.Multer.File) => {
            return storage.putFile(image.buffer, 'public', image.originalname, image.mimetype);
        });
        const uploadedFiles = await Promise.all(uploadOtherImages);
        for (const uploadedFile of uploadedFiles) {
            imagesToInsert.push({
                propertyId: created.id,
                path: `${uploadedFile.generatedFilePath}?mimeType=${uploadedFile.mimeType}`
            });
        }

        await PropertyGallery.bulkCreate(imagesToInsert);

        // create the specification
        const specificationsToInsert: { propertyId: number, title: string, value: string }[] = []
        for (const specification of specifications) {
            specificationsToInsert.push({
                propertyId: created.id,
                title: specification.title,
                value: specification.value,
            })
        }

        await PropertySpecification.bulkCreate(specificationsToInsert);

        apiResponse = { message: "Property created successfully!", data: created };
        res.status(200).json(apiResponse)

    }catch (error) {
        next(error);
    }
}

export const updateProperty = async(req: Request, res: Response, next: NextFunction) => {

    try {



    }catch (error) {
        next(error);
    }

}

export const getProperties = async(req: Request, res: Response, next: NextFunction) => {

    // you can apply filters here //

    const properties = await Property.findAll();
    const apiResponse = { message: "success", data: properties };
    res.status(200).json(apiResponse)
}

export const getPropertyDetail = async(req: Request, res: Response, next: NextFunction) => {
    const propertyId = req.params.propertyId;

    const property = await Property.findByPk(propertyId);
    const apiResponse = { message: "success", data: property };
    res.status(200).json(apiResponse)
}


export const createPropertyCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { title, description } = req.body;
        const slug = slugify(title);

        const created = await PropertyCategory.create({
            title,
            description,
            slug,
        })

        let apiResponse: ApiResponse = { message: "success", data: created };
        res.status(201).json(apiResponse)

    }catch (error) {
        next(error);
    }
}

//  Property Categories Section ----------------
export const getPropertyCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const categories = await PropertyCategory.findAll()
        let apiResponse: ApiResponse = { message: "success", data: categories };
        res.status(200).json(apiResponse)

    }catch (error) {
        next(error);
    }
}

export const removePropertyCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { id } = req.params

        const category = await PropertyCategory.findByPk(id)

        // category with homes assigned to it cannot be destroyed
        const attachedProperties = await Property.findAll({
            where: {
                categoryId: id
            }
        })
        if(attachedProperties.length > 0){
            let apiResponse: ApiResponse = { message: "This category cannot be removed because there are properties associated with it" };
            res.status(400).send(apiResponse)
            return
        }

        category?.destroy()
        let apiResponse: ApiResponse = { message: "success" };
        res.status(200).json(apiResponse)

    }catch (error) {
        next(error);
    }
}

export const updatePropertyCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { title, description } = req.body;
        const slug = slugify(title);
        const created = await PropertyCategory.update({
            title,
            description,
            slug,
        }, {
            where: {
                id: id
            }
        })
        let apiResponse: ApiResponse = { message: "success", data: created };
        res.status(200).json(apiResponse)

    }catch (error) {
        next(error);
    }
}

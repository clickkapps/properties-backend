import User from "../models/User";
import {NextFunction, Request, Response} from "express";
import {ApiResponse} from "../types/shared.types";
import Property from "../models/Property";
import PropertySpecification from "../models/PropertySpecification";
import {storage} from "../helpers/storage";
import PropertyGallery from "../models/PropertyGallery";
import {slugify} from "../helpers/utils";
import PropertyCategory from "../models/PropertyCategory";
import {
    addPropertyGallery,
    addPropertySpecifications,
    attachedPropertyRelationships,
    getPropertyById
} from "../traits/properties.trait";
import moment from "moment";
import {defineAbilitiesFor} from "../helpers/defineAbility";
import {permissionActions, permissionSubjects} from "../helpers/constants";



//  Property section
export const createProperty = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const { ownerId } = req.query

        if (!ownerId) {
            console.log("ownerId is missing");
            res.status(404).send("Invalid request");
            return
        }


        console.log("createProperty called.", req.body)

        const creatorId = (req.user as User).id

        let apiResponse: ApiResponse

        // ownerId here is the person this property belongs to
        // creatorId is the one adding the property to the system

        const files = req.files as {
            [fieldName: string]: Express.Multer.File[];
        };

        const mainImage = files?.mainImage?.[0];
        const otherImages = files?.otherImages || [];

        const { propertyCategoryId,
            title,
            description,
            specifications,
            offerType,
            amount,
            currency,
            address,
            country,
            region,
            rooms,
            washrooms
        } = req.body

        if(!title || !description || !propertyCategoryId || !country || !region || !currency || !amount) {
            apiResponse = { message: "Invalid request" };
            res.status(400).send(apiResponse)
            return;
        }

        let mainImagePath
        // upload main image and get path
        if(mainImage) {
            const mainImageOriginalName = mainImage?.originalname
            const uploadedFile = await storage.putFile({ body: mainImage?.buffer, fileName: mainImageOriginalName} )
            mainImagePath = `${uploadedFile.generatedFilePath}?mimeType=${uploadedFile.mimeType}`
        }

        // create the property
        const created = await Property.create({
            propertyCategoryId,
            userId: ownerId,
            creatorId: creatorId,
            title,
            description,
            mainImagePath,
            offerType,
            amount: amount,
            currency,
            address,
            country,
            region,
            rooms,
            washrooms
        })

        // create the image gallery
        if(otherImages) {
            await addPropertyGallery(created.id, otherImages)
        }

        // create the specification

        if(specifications) {
            await addPropertySpecifications(created.id, JSON.parse(specifications))
        }

        apiResponse = { message: "Property created successfully!", data: created };
        res.status(200).json(apiResponse)

    }catch (error) {
        next(error);
    }
}

export const updateProperty = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const { id } = req.params;
        const property = await Property.findByPk(id)
        let apiResponse: ApiResponse

        if (!property) {
            console.log("updatedProperty called, id=", id);
            apiResponse = { message: "Property not found" };
            res.status(400).json(apiResponse)
            return
        }

        const files = req.files as {
            [fieldName: string]: Express.Multer.File[];
        };

        // mainImage can be replaced
        let mainImagePath = property?.mainImagePath
        if(files?.mainImage !== undefined && files?.mainImage.length > 0) {
           const uploadedFile = await storage.putFile({ body: files?.mainImage?.[0].buffer, fileName: files?.mainImage?.[0].originalname })
           mainImagePath = `${uploadedFile.generatedFilePath}?mimeType=${uploadedFile.mimeType}`
        }

        // you can only add to specifications in the updateProperty function. Separate method to delete specification

        const { propertyCategoryId,
            title, description,
            specifications,
            offerType,
            amount,
            currency,
            address,
            country,
            region,
            rooms,
            washrooms
        } = req.body


        await property.update({
            propertyCategoryId,
            title: title || property?.title,
            description: description || property?.description,
            mainImagePath: mainImagePath,
            offerType,
            amount,
            currency,
            address,
            country,
            region,
            rooms,
            washrooms
        })

        // you can only add to otherImages in the updateProperty function. Separate method to delete otherImage
        const otherImages = files?.otherImages || [];
        if(otherImages.length > 0) {
            // add to the gallery. it's safe to add up because deletion is done on a different route
            await addPropertyGallery(property.id, otherImages)
        }

        // add to the specification, it's safe to add up because deletion is handled on a different route
        if(specifications) {
            await addPropertySpecifications(property.id, JSON.parse(specifications))
        }

        apiResponse = { message: "success", data: await getPropertyById(property.id) };

        res.status(200).json(apiResponse)

    }catch (error) {
        next(error);
    }

}

export const removeProperty = async(req: Request, res: Response, next: NextFunction) => {
    try {

        const  { id } = req.params

        // related fields and specifications are supposed to (cascade delete) when this property is deleted
        let apiResponse: ApiResponse

        const property = await Property.findByPk(id)
        if (!property) {
            apiResponse = { message: "Property not found." }
            res.status(400).json(apiResponse)
            return
        }

        await property.destroy()
        apiResponse = { message: "Property published", data: await getPropertyById(property.id) }
        res.status(200).json(apiResponse)


    }catch (error) {
        next(error);
    }
}
export const publishProperty = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const  { id } = req.params

        // related fields and specifications are supposed to (cascade delete) when this property is deleted
        let apiResponse: ApiResponse

        const property = await Property.findByPk(id)
        if (!property) {
            apiResponse = { message: "Property not found." }
            res.status(400).json(apiResponse)
            return
        }

        const userId = (req.user as User).id

        await property.update({
            published: true,
            publisherId: userId,
            publishedAt: new Date()
        })
        apiResponse = { message: "Property deleted", data: await getPropertyById(property.id) }
        res.status(200).json(apiResponse)


    }catch (error) {
        next(error);
    }
}

export const unPublishProperty = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const  { id } = req.params

        // related fields and specifications are supposed to (cascade delete) when this property is deleted
        let apiResponse: ApiResponse

        const property = await Property.findByPk(id)
        if (!property) {
            apiResponse = { message: "Property not found." }
            res.status(400).json(apiResponse)
            return
        }

        await property.update({
            published: false,
            publisherId: null,
            publishedAt: null
        })
        apiResponse = { message: "Property unpublished", data: await getPropertyById(property.id) }
        res.status(200).json(apiResponse)


    }catch (error) {
        next(error);
    }
}


const propertiesQueryWhere = (req: Request) => {

    const { userId, published  } = req.body

    const where: any = {}

    if (published === 'false' || published === undefined) {

        const user = req.user as User

        if(!user) {
            throw new Error('Forbidden')
        }

        const ability = defineAbilitiesFor(user);

        if(ability.cannot(permissionActions.read, permissionSubjects.unpublishedProperties)) {
            throw new Error('Forbidden')
        }

        // check if user is not admin, then return properties of that user
    } else {

        where.published = true;

    }

    if (userId !== undefined) {
        where.userId = +userId;
    }

    return where
}

// count published or unpublished properties
export const countProperties = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const where = propertiesQueryWhere(req)

        const count = await Property.count({
            where: where
        })

        const apiResponse: ApiResponse = {
            data: {count},
            message: "success"
        }

        res.status(200).send(apiResponse);

    }catch (e) {
        next(e)
    }
}

export const getProperties = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const where = propertiesQueryWhere(req)


        const properties = await Property.findAll( {
            where: where,
            order: [['createdAt', 'DESC']],
        });

        const transformed = properties.map((property) => {
            if(property.mainImagePath) {
                const split = property.mainImagePath.split("/")
                // const folder = split[0]
                property.mainImagePath = split[1]
            }
            // if(property.gallery && property.gallery.length > 0) {
            //     property.gallery.map((g) => {
            //         if(g?.path) {
            //             g.path = g.path.split("/")[1]
            //         }
            //         return g
            //     })
            // }
            return property
        })

        const apiResponse: ApiResponse = { message: "success", data: transformed };
        res.status(200).json(apiResponse)

    }catch (error) {
        next(error);
    }
}

export const removePropertySpecification = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const { id } = req.params
        let apiResponse: ApiResponse

        const specification = await PropertySpecification.findByPk(id)

        if (!specification) {
            apiResponse = { message: "Specification not found." }
            res.status(400).json(apiResponse)
            return
        }

        await specification.destroy()

        apiResponse = { message: "Success", data: await getPropertyById(specification.propertyId) }
        res.status(200).json(apiResponse)

    }catch (error) {
        next(error);
    }

}

export const removePropertyGallery = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        let apiResponse: ApiResponse

        const gallery = await PropertyGallery.findByPk(id)
        if (!gallery) {
            apiResponse = { message: "Image not found." }
            res.status(400).json(apiResponse)
            return
        }

        await gallery.destroy()
        apiResponse = { message: "success", data: await  getPropertyById(gallery.propertyId) }
        res.status(200).json(apiResponse)

    }catch (error) {
        next(error);
    }
}

export const getPropertyDetail = async(req: Request, res: Response, next: NextFunction) => {

    const propertyId = req.params.id;
    const property = await getPropertyById(+propertyId)
    if(property?.mainImagePath) {
        const split = property.mainImagePath.split("/")
        // const folder = split[0]
        property.mainImagePath = split[1]
    }
    if(property?.gallery && property.gallery.length > 0) {
        property.gallery = property.gallery.map((g) => {
            if(g?.path) {
                g.path = g.path.split("/")[1]
            }
            return g
        })
    }
    const apiResponse: ApiResponse = { message: "success", data: property };
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

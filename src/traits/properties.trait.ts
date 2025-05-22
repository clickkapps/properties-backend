import Property from "../models/Property";
import User from "../models/User";
import {storage} from "../helpers/storage";
import PropertyGallery from "../models/PropertyGallery";
import PropertySpecification from "../models/PropertySpecification";

export const getPropertyById =  async (id: number) : Promise<Property | null> => {
    return Property.findByPk(id, {
        include: attachedPropertyRelationships,
    });
}

export const attachedPropertyRelationships = [{
    association: 'user',
    attributes: { exclude: [
            ...User.optionalForAssociations
        ] },
}, {
    association: 'creator',
    attributes: { exclude: [
            ...User.optionalForAssociations,
        ]
    }
}, 'category', 'specifications', 'gallery']


export const addPropertyGallery = async (propertyId: number, otherImages: Express.Multer.File[]) => {
    // create the image gallery
    const imagesToInsert: { propertyId: number, path: string }[] = []

    // const
    const uploadOtherImages = otherImages.map((image: Express.Multer.File) => {
        return storage.putFile({ body: image.buffer, fileName: image.originalname,});
    });
    const uploadedFiles = await Promise.all(uploadOtherImages);
    for (const uploadedFile of uploadedFiles) {
        imagesToInsert.push({
            propertyId: propertyId,
            path: `${uploadedFile.generatedFilePath}?mimeType=${uploadedFile.mimeType}`
        });
    }

    await PropertyGallery.bulkCreate(imagesToInsert);

}

export const addPropertySpecifications = async (propertyId: number, specifications: { title: string, value: string }[]) => {

    const specificationsToInsert: { propertyId: number, title: string, value: string }[] = []
    for (const specification of specifications) {
        specificationsToInsert.push({
            propertyId: propertyId,
            title: specification.title,
            value: specification.value,
        })
    }

    await PropertySpecification.bulkCreate(specificationsToInsert);
}

export const setAccessibleImages =  (properties: Property[]) => {
    return properties.map((property) => {
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
}
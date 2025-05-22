import { Router } from 'express'
import {
        createProperty,
        createPropertyCategory,
        deleteOtherImage,
        deletePropertySpecification,
        getNoAuthorizationProperties,
        getAuthorizedProperties,
        getPropertyCategories,
        getPropertyDetail,
        postPromoteProperty,
        publishProperty,

        removeProperty,
        removePropertyCategory,
        removePropertyGallery,
        removePropertySpecification,
        unPublishProperty,
        updateProperty,
        updatePropertyCategory,
        getRelatedNoAuthorizationProperties,
        getPromotedNoAuthorizationProperties,
        getFeaturedNoAuthorizationProperties, countAuthorizedProperties
} from "../controllers/properties.controller";
import {reqFile} from "../helpers/utils";
import {isAuthenticated, isAuthorized} from "../middlewares/auth.middleware";
import Property from "../models/Property";
import {permissionActions, permissionSubjects} from "../helpers/constants";

const router = Router()


// Group for categories
const categoriesRouter = Router();

categoriesRouter.get("/", getPropertyCategories)
categoriesRouter.post("/", isAuthenticated, createPropertyCategory)
categoriesRouter.delete("/:id", isAuthenticated, removePropertyCategory)
categoriesRouter.put("/:id", isAuthenticated, updatePropertyCategory)

// Group for specifications
const specificationsRouter = Router();
specificationsRouter.delete("/:id", removePropertySpecification)

// Group for gallery
const galleryRouter = Router();
galleryRouter.delete("/:id", removePropertyGallery)


// Mount categories inside the properties router
router.use('/categories', categoriesRouter);
router.use('/specifications', specificationsRouter);
router.use('/gallery', galleryRouter);

router.get("/", isAuthenticated, getAuthorizedProperties)
router.get("/count", isAuthenticated, countAuthorizedProperties)

// for website
router.get("/public/filtered", getNoAuthorizationProperties)
router.get("/public/related/{propertyId}", getRelatedNoAuthorizationProperties)
router.get("/public/promoted", getPromotedNoAuthorizationProperties)
router.get("/public/featured", getFeaturedNoAuthorizationProperties)

router.post("/", isAuthenticated, isAuthorized(permissionActions.create, permissionSubjects.properties), reqFile.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'otherImages', maxCount: 10 }
]), createProperty);
router.get("/:id", getPropertyDetail)
router.delete("/:id", isAuthenticated, removeProperty)
router.delete("/specification/:id", isAuthenticated, deletePropertySpecification)
router.delete("/other-image/:id", isAuthenticated, deleteOtherImage)
router.put("/publish/:id", isAuthenticated, publishProperty)
router.put("/unpublish/:id", isAuthenticated, unPublishProperty)
router.post("/promote", isAuthenticated, postPromoteProperty)

router.put("/:id", isAuthenticated, reqFile.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'otherImages', maxCount: 10 }
]), updateProperty);


export default router
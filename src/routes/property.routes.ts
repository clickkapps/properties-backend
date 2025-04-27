import { Router } from 'express'
import {
        createProperty,
        createPropertyCategory,
        getProperties,
        getPropertyCategories,
        getPropertyDetail,
        removeProperty,
        removePropertyCategory, removePropertyGallery,
        removePropertySpecification,
        updateProperty,
        updatePropertyCategory
} from "../controllers/properties.controller";
import {reqFile} from "../helpers/utils";
import {isAuthenticated, isAuthorized} from "../middlewares/auth.middleware";
import Property from "../models/Property";

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

router.get("/", getProperties)
router.post("/", isAuthenticated, isAuthorized('create', Property.name), reqFile.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'otherImages', maxCount: 10 }
]), createProperty);
router.get("/:id", getPropertyDetail)
router.delete("/:id", isAuthenticated, removeProperty)

router.put("/:id", isAuthenticated, reqFile.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'otherImages', maxCount: 10 }
]), updateProperty);


export default router
import { Router } from 'express'
import {
        createProperty,
        createPropertyCategory,
        getProperties, getPropertyCategories, getPropertyDetail, removePropertyCategory,
        updateProperty, updatePropertyCategory
} from "../controllers/properties.controller";
import {requestFile} from "../helpers/utils";
import {isAuthenticated} from "../middlewares/auth.middleware";

const router = Router()



// defaults /property POST
router.post("/", isAuthenticated, requestFile.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'otherImages', maxCount: 10 }
]), createProperty);


// defaults /property PUT
router.put("/", isAuthenticated, updateProperty);

router.get("/", getProperties)

router.get("/categories", getPropertyCategories)
router.post("/category", createPropertyCategory)
router.delete("/category", removePropertyCategory)
router.put("/category", updatePropertyCategory)
router.get("/:id", getPropertyDetail)



export default router
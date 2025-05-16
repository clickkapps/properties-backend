import {Router} from "express";
import {getPackages} from "../controllers/packages.controller";
import {
    countPropertyShowings,
    deleteShowing,
    getPropertyShowings,
    getShowingDetails,
    postNewShowing,
    updateShowing, updateShowingStatus
} from "../controllers/showings.controller";

const router = Router()

router.get('/', getPropertyShowings)
router.get('/count', countPropertyShowings)
router.post('/', postNewShowing)
router.put('/status/:id', updateShowingStatus)
router.put('/:id', updateShowing)
router.get('/:id', getShowingDetails)
router.delete('/:id', deleteShowing)

export default router
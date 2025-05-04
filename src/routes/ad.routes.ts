import {Router} from "express";
import {getPublicAdvertisement, getUserAdvertisement, postNewAdvertisement} from "../controllers/ad.controller";
import {isAuthenticated} from "../middlewares/auth.middleware";
import {reqFile} from "../helpers/utils";

const router = Router()

router.post('/new', isAuthenticated, reqFile.single('image'), postNewAdvertisement)
router.get('/', isAuthenticated, getUserAdvertisement)
router.get('/public', getPublicAdvertisement)

export default router
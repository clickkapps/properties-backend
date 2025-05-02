import {Router} from "express";
import {postNewAdvertisement} from "../controllers/ad.controller";

const router = Router()

router.post('/new', postNewAdvertisement)



export default router
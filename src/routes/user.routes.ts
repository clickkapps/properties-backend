import { Router } from 'express'
import {getBasicInfo, updateBasicInfo} from "../controllers/user.controller";

const router = Router()

router.get("/basic-info", getBasicInfo);
router.put("/basic-info", updateBasicInfo);


export default router
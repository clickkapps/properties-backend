import { Router } from 'express'
import {getBasicInfo, updateBasicInfo, updateUserEntitlement} from "../controllers/user.controller";

const router = Router()

router.get("/basic-info", getBasicInfo);
router.put("/basic-info", updateBasicInfo);
router.put("/entitlement", updateUserEntitlement);

export default router
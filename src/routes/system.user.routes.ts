import {Router} from "express";
import {getSystemIndexInfo} from "../controllers/sytem.user.controller";

const router = Router()

router.get("/index", getSystemIndexInfo);

export default router
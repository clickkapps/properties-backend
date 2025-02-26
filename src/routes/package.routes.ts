import { Router } from 'express'
import {getPackages} from "../controllers/packages.controller";

const router = Router()

router.get('/all', getPackages)

export default router
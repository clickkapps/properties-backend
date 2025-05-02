import {Router} from "express";
import {getBill, postInitiateSubscription} from "../controllers/subscriptions.controller";

const router = Router()

router.post('/bill', getBill)
router.post('/initiate', postInitiateSubscription)

export default router
import {Router} from "express";
import {
    getBill,
    checkSubscriptionStatus,
    postProcessSubscription,
    resendSubscriptionReminder, updateSubscriptionStatus
} from "../controllers/subscriptions.controller";
import {isAuthenticated} from "../middlewares/auth.middleware";

const router = Router()

router.post('/bill', isAuthenticated, getBill)
router.post('/process', isAuthenticated, postProcessSubscription)
router.get('/status/:reference', checkSubscriptionStatus)
router.post('/reminder', resendSubscriptionReminder)
router.put('/status/:id', isAuthenticated,  updateSubscriptionStatus)

export default router
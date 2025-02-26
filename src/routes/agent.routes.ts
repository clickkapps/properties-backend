import { Router } from 'express'
import {updateAgentPackage} from "../controllers/agent.controller";

const router = Router()

router.get('/package/:packageId', updateAgentPackage)


export default router
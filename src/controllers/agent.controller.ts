import {Request, Response} from "express";
import {ApiResponse} from "../types/shared.types";
import User from "../models/User";


const getAgentByUserId = async (userId: number ) => {
    return await User.findByPk(userId);
}

export const postCreateAgent = async (req: Request, res: Response) => {
    const userId =  (req.user as User).id

    const agent = getAgentByUserId(userId)

    const apiResponse: ApiResponse = {
        message: "Agent created!",
        data: agent
    }

    res.status(201).send(apiResponse)
}

export const updateAgentPackage = async (req: Request, res: Response) => {
    const userId = (req.user as User).id

    const packageId = req.params.packageId

    try {
        const agent = await getAgentByUserId(userId)
        const updated = await agent?.update({
            packageId: packageId,
        })

        const apiResponse: ApiResponse = {
            message: "Package updated!",
            data: agent
        }

        res.status(201).send(apiResponse)
    }catch(err: unknown) {
        const apiResponse: ApiResponse = {
            message: (err as Error).message,
        }
        res.status(500).send(apiResponse)
    }


}



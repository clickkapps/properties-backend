import {NextFunction, Request, Response} from "express";
import PropertyShowing from "../models/PropertyShowing";
import User from "../models/User";
import Subscription from "../models/Subscription";
import Property from "../models/Property";
import {Op} from "@sequelize/core";
import {addMonths, endOfMonth, startOfMonth, subMonths} from "date-fns";


export const postNewShowing = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { userId, subscriptionId, propertyId, appointmentDate  } = req.body;

        if(!userId || !subscriptionId || !propertyId || !appointmentDate){
            res.status(400).send({ message: "Invalid request"})
            return
        }

        const showing = await PropertyShowing.create({
            userId: userId,
            subscriptionId: subscriptionId,
            propertyId: propertyId,
            appointmentDate: new Date(appointmentDate),
        })

        const showingWithDetails = await getPropertyShowingById(showing.id)
        res.status(200).send({ data: showingWithDetails})

    }catch (error) {
        next(error)
    }

}

export const updateShowing = async (req: Request, res: Response, next: NextFunction) => {

   try {

       const { id } = req.params
       const { propertyId, appointmentDate  } = req.body;

       const showing = await PropertyShowing.findByPk(id)
       if(!showing){
           res.status(400).send({ message: "Invalid request"})
           return
       }

       await showing.update({
           propertyId: propertyId,
           appointmentDate: new Date(appointmentDate),
       })

       const showingWithDetails = await getPropertyShowingById(showing.id)
       res.status(200).send({ data: showingWithDetails})

   }catch (error) {
       next(error)
   }


}

export const getShowingDetails = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const showingWithDetails = getPropertyShowingById(Number(id as string))
    res.status(200).send({ data: showingWithDetails})
}


const getPropertyShowingById = async (id: number): Promise<PropertyShowing | null> => {
    return await PropertyShowing.findByPk(id, {
        include: [
            User,
            Subscription,
            Property
        ]
    })
}

const getShowingsQuery = async (status?: string, period?: {fromDate: string, toDate: string}) => {

    const defaultStatus = "pending"

    const where:any = {
        status: status || defaultStatus,
        appointmentDate: {
            [Op.between]: [period?.fromDate || startOfMonth(subMonths(new Date(), 1)), period?.toDate || endOfMonth(addMonths(new Date(), 1))]
        }
    }

    return where

}

export const countPropertyShowings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status } = req.query
        const where = await getShowingsQuery(status as string)
        const count = await PropertyShowing.count({
            where: where,
        })
        res.status(200).send({ data: count })
    }catch (error) {
        next(error)
    }
}

export const getPropertyShowings = async (req: Request, res: Response, next: NextFunction) => {

    try {

        // if you want to limit by userId
        const { offset, limit, status } = req.query

        const where = await getShowingsQuery(status as string)

        const showings = await PropertyShowing.findAll({
            where: where,
            include: [
                User,
                Subscription,
                Property
            ],
            offset: offset ? parseInt(offset as string, 10) : undefined,
            limit: limit ? parseInt(limit as string, 10) : undefined,
            order: [['createdAt', 'DESC']],
        })

        res.status(200).send({ data: showings })

    }catch (error) {
        next(error)
    }

}

export const deleteShowing = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { id } = req.params
        const showing = await PropertyShowing.findByPk(id)
        if(!showing){
            res.status(400).send({ message: "Invalid request"})
            return
        }

        const subscription = await showing.getSubscription()

        if(!subscription) {
            res.status(400).send({ message: "Subscription not found" })
            return
        }

        if(subscription.status === "success") {
            res.status(400).send({ message: "Customer has already paid for this subscription" })
            return
        }

        await showing.destroy()

        res.status(200).send({ message: "Showing deleted successfully"})

    }catch (error) {
        next(error)
    }
}

export const updateShowingStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { status } = req.body
        const showing = await PropertyShowing.findByPk(id)
        if(!showing){
            res.status(400).send({ message: "Invalid request"})
            return
        }

        await showing.update({
            status: status,
        })

        res.status(200).send({ message: "updated! "})

    }catch (error) {
        next(error)
    }
}



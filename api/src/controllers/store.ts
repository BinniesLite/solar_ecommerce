import { Router } from 'express'
import { Request, Response } from 'express';
import clerkClient from '@clerk/clerk-sdk-node';
import prismaDB from "../../lib/prisma";

const router = Router()

const getStoreByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body

        const stores = await prismaDB.store.findMany({
            where: {
                userId
            }
        })


        res.send(stores).status(200)
    } catch (error) {

    }

}

const getAllStore = async (req: Request, res: Response) => {
    try {
        const stores = await prismaDB.store.findMany();

        res.send(stores).status(200)
    } catch (error) {

    }
}

export {
    getStoreByUserId,
    getAllStore
};

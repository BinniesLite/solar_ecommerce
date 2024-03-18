import { Router } from "express";
import express, { Request, Response } from 'express';
import clerkClient from '@clerk/clerk-sdk-node';


const router = Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns a list of users
 *     description: Retrieves a list of users from Clerk.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user ID.
 *                   username:
 *                     type: string
 *                     description: The user's username.
 *                   email:
 *                     type: string
 *                     description: The user's email address.
 */
router.get("/users", async (req: Request, res: Response) => {
    const users = await clerkClient.users.getUserList();

    return res.send(users)
})  


export default router
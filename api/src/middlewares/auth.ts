import { Request, Response, NextFunction } from "express"


export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers["userId"];

    // Attach userId to the request object
    if (userId) {
        
        next(); // Continue to the next middleware or route handler
    } else {
        // Handle the case where userId is not provided in the headers
        res.status(401).send("Unauthorized: No userId provided");
    }


}
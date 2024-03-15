import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000; // Provide a default port if not specified in .env

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

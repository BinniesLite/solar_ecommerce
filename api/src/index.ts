import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "../swagger-setup";

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import UserRoute from './controllers/user';
import routers from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000; // Provide a default port if not specified in .env

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});

app.use("/api", routers)


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


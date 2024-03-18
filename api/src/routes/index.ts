import { Router } from 'express';

import storeRouter from "./store";

const router = Router();


const appRoutes = [
    {
        path: "/store",
        route: storeRouter
    }
]

appRoutes.forEach((route) => router.use(route.path, route.route))

export default router;
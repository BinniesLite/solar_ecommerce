import { Router } from 'express'
import { 
    getStoreByUserId, 
    getAllStore 
} from '../controllers/store';

const router = Router();

router.get("/:userID", getStoreByUserId)

router.get("/", getAllStore)

export default router;
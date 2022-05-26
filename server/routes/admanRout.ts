import  express  from "express";
import { auth } from '../middleware/auth'
import { getAllUsers } from '../controllers/user'

const router = express.Router()

router.get('/users', getAllUsers)

export default router
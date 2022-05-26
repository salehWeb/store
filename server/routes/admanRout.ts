import  express  from "express";
import { auth, isAdman } from '../middleware/auth'
import { getAllUsers } from '../controllers/user'

const router = express.Router()

router.get('/users', auth, isAdman, getAllUsers)

export default router
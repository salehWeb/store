import  express  from "express";
import { auth, isAdman } from '../middleware/auth'
import { getAllUsers, deletUser } from '../controllers/user'
import {deletItem} from '../controllers/card'
import { admanPayment, getPayment } from "../controllers/payment";

const router = express.Router()

router.get('/users', auth, isAdman, getAllUsers)

router.delete('/deletitem/:id', auth, isAdman, deletItem)

router.delete('/deletuser/:id', auth, isAdman, deletUser)

router.get('/admanPayment',auth, isAdman, admanPayment) 

router.get('/payment/:id', auth, isAdman, getPayment)

export default router
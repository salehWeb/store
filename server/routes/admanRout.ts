import  express  from "express";
import { auth, isAdman } from '../middleware/auth'
import { getAllUsers, deletUser } from '../controllers/user'
import {deletItem} from '../controllers/card'
import { admanPayment, canselPayment, getHistoryPayments, getNewPaymentsSendat, getPayment, sendPayment } from "../controllers/payment";

const router = express.Router()

router.get('/users', auth, isAdman, getAllUsers)

router.delete('/deletitem/:id', auth, isAdman, deletItem)

router.delete('/deletuser/:id', auth, isAdman, deletUser)

router.get('/admanPayment',auth, isAdman, admanPayment) 

router.get('/payment/:id', auth, isAdman, getPayment)

router.post('/payment/send/:id', auth, isAdman, sendPayment)

router.get('/payment/canselPayment/:id', auth, isAdman, canselPayment)

router.get("/history/payment", auth, isAdman, getHistoryPayments)

router.get("/new/payments", auth, isAdman, getNewPaymentsSendat)

export default router
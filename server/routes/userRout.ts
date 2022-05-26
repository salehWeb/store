import express  from 'express'
import {auth} from '../middleware/auth'
import { login, logout, reggstar } from '../controllers/user'
const router = express.Router()

router.post('/', login)

router.post('/sgs', reggstar)

router.post('/logout',  logout)


export default router
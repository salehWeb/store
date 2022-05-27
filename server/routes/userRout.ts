import express  from 'express'
import {auth} from '../middleware/auth'
import { login, logout, reggstar, loginGoogle, reggstarGoogle } from '../controllers/user'
const router = express.Router()

router.post('/', login)

router.post('/Sing_inGoogle', loginGoogle)

router.post('/LoginGoogle', reggstarGoogle)

router.post('/sgs', reggstar)

router.post('/logout',  logout)

export default router
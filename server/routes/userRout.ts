import express  from 'express'
import {auth} from '../middleware/auth'
import { login, logout, reggstar, hell } from '../controllers/user'
const router = express.Router()

router.post('/', login)
router.post('/sgs', reggstar)
router.post('/logout',  logout)

router.get('/hell', auth, hell)


export default router
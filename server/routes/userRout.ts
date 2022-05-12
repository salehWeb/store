import express  from 'express'
import { getUser, login, logout, reggstar, virfyToken } from '../controllers/user'
const router = express.Router()

router.post('/', login)
router.post('/sgs', reggstar)
router.post('/logout', logout)
router.get('/user', virfyToken, getUser)


export default router
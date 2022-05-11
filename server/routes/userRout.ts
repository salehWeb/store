import express  from 'express'
import { login, reggstar } from '../controllers/user'
const router = express.Router()

router.post('/', login)
router.post('/sgs', reggstar)

export default router
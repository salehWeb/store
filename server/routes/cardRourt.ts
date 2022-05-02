import  express  from "express";
import { postCard, getCard } from '../controllers/card'

const router = express.Router()

router.post('/creatItem', postCard)
router.get('/', getCard)

export default router
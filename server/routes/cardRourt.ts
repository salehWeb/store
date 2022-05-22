import  express  from "express";
import { auth } from '../middleware/auth'
import { postCard, getCard, sershQurey, likesprodacetd } from '../controllers/card'

const router = express.Router()

router.post('/creatItem', postCard)
router.get('/', getCard)
router.get('/sersh', sershQurey)
router.patch('/:id', auth, likesprodacetd)

export default router
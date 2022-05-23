import  express  from "express";
import { auth } from '../middleware/auth'
import { postCard, getCard, sershQurey, likesprodacetd, getOneCard } from '../controllers/card'

const router = express.Router()

router.post('/creatItem', postCard)

router.get('/', getCard)

router.get('/sersh', sershQurey)

router.patch('/:id', auth, likesprodacetd)

router.get('/card/:id', getOneCard)

export default router
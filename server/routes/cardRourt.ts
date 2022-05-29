import  express  from "express";
import { auth, isAdman } from '../middleware/auth'
import { postCard, getCard, sershQurey, likesprodacetd, getOneCard, upDataProdectd, commentItem, upDataComment, deleteComment } from '../controllers/card'

const router = express.Router()

router.get('/', getCard)

router.get('/sersh', sershQurey)

router.get('/card/:id', getOneCard)

router.patch('/:id', auth, likesprodacetd)

router.patch('/card/:id', auth, isAdman, upDataProdectd)

router.post('/creatItem', auth, isAdman, postCard)

router.patch('/comment/creat/:id', auth, commentItem)

router.patch('/comment/updata/:id', auth, upDataComment)

router.patch('/comment/delete/:id', auth, deleteComment)

export default router
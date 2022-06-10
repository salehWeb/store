import  express  from "express";
import { auth, isAdman } from '../middleware/auth'
import { postCard, getCard, sershQurey, likesprodacetd, getOneCard, upDataProdectd, commentItem, upDataComment, deleteComment, getMostLOvedItems, getImage } from '../controllers/card'
import { getPayemanet } from "../controllers/payment";

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

router.get('/loved', getMostLOvedItems)

router.post('/payments', auth, getPayemanet)

router.get("/images/:id", getImage)

export default router
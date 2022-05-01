import  express  from "express";

import { postCard } from '../controllers/card'

const router = express.Router()

router.post('/', postCard)

export default router
import express from 'express'
import {getImg} from '../controllers/card'

const router = express.Router()

router.get('/:id', getImg)

export default router
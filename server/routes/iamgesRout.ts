import express from 'express'
import card from '../models/card'
import {getImg} from '../controllers/card'

const router = express.Router()

router.get('/:id', getImg)

export default router
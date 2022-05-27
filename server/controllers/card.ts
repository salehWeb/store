import card from "../models/card";
import { body, validationResult, check } from 'express-validator'

export const getOneCard = async (req: any, res: any) => {
    const id = req.params.id
    try {
        const data = await card.findById(id, { likes: 1, _id: 1 })
        res.status(201).json(data)
    } catch (error: any) {
        res.status(201).json({ msg: error.message })
        console.log(error);
    }
}


export const postCard = async (req: any, res: any) => {
    const data = await req.body;

    body(data.desc).isString().isLength({ min: 12 })
    body(data.title).isString().isLength({ min: 3 })
    body(data.price).isNumeric().isEmpty()
    body(data.img).isString().isEmpty()
    body(data.type).isString().isLength({ min: 3 })
    body(data.pieces).isNumeric().isEmpty()

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(200).json({errors: [ errors.array() ]})
    }

    try {
        const newCard = new card({ ...data, createdAt: new Date().toISOString() })
        await newCard.save()
        res.status(201).json({ msg: 'sucses created'})
    } catch (error) {
        res.status(200).json(error)
        console.log(error);
    }

}

export const getCard = async (req: any, res: any) => {
    try {
        const data: any = await card.find({}, { img: 0 })
        res.status(201).json(data)
    } catch (error: any) {
        res.status(201).json({ msg: error.message })
    }
}


export const getImg = async (req: any, res: any) => {
    const id = req.params.id
    try {
        const { img }: any = await card.findById(id, { img: 1, _id: 0 })
        res.status(201).json(img)
    } catch (error: any) {
        res.status(201).json({ msg: error.message })
    }
}

export const sershQurey = async (req: any, res: any) => {
    const sersh = req.query.qurey
    const data = await card.find({ $or: [{ title: sersh }, { type: sersh }, { desc: sersh }, { _id: sersh }] })

    res.status(200).json({ data })
}

export const likesprodacetd = async (req: any, res: any) => {
    const data = await req.body
    console.log(data);
    try {
        const updataed = await card.findByIdAndUpdate(data._id, data, { new: true })
        res.status(202).json(updataed)
    } catch (error: any) {
        res.status(201).json({ msg: error.message })
        console.log(error)
    }

}

export const upDataProdectd = async (req: any, res: any) => {
    const id = req.params.id
    const data = await req.body
    try {
        const result = await card.findByIdAndUpdate(id, { ...data, createdAt: new Date().toISOString() })
        res.status(201).json(result)
    } catch (error: any) {
        res.status(201).json({ msg: error.message })
        console.log(error)
    }
}

export const deletItem = async (req: any, res: any) => {
    const id = req.params.id
    console.log(id)
    try {
        await card.findByIdAndDelete(id)
        res.status(201).json({ msg: 'delete it sucses' })
    } catch (error: any) {
        res.status(201).json({ msg: error.message })
        console.log(error)
    }
}
import card from "../models/card";
import { body, validationResult } from 'express-validator'
import { v4 as uuidv4 } from 'uuid';
import {Request, Response} from 'express'


export const getOneCard = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const data = await card.findById(id, { likes: 1, _id: 1 })
        res.status(201).json(data)
    } catch (error: any) {
        res.status(201).json({ msg: error.message })
        console.log(error);
    }
}


export const postCard = async (req: Request, res: Response) => {
    const data = req.body;

    body(data.desc).isString().isLength({ min: 12 })
    body(data.title).isString().isLength({ min: 3 })
    body(data.price).isNumeric().isEmpty()
    body(data.img).isString().isEmpty()
    body(data.type).isString().isLength({ min: 3 })
    body(data.pieces).isNumeric().isEmpty()

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: [errors.array()] })
    }

    try {
        const newCard = new card({ ...data, createdAt: new Date().toISOString() })
        await newCard.save()
        res.status(201).json({ msg: 'sucses created' })
    } catch (error) {
        res.status(200).json(error)
        console.log(error);
    }

}

export const getCard = async (req: Request, res: Response) => {
    try {
        const data: any = await card.find({}, { img: 0 }).sort({ _id: -1 })
        res.status(201).json(data)
    } catch (error: any) {
        res.status(201).json({ msg: error.message })
    }
}


export const getImg = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const { img }: any = await card.findById(id, { img: 1, _id: 0 })
        res.status(201).json(img)
    } catch (error: any) {
        res.status(201).json({ msg: error.message })
    }
}

export const sershQurey = async (req: Request, res: Response) => {
    const serch: any = req.query.qurey
    try {
        if(serch.length === 24) {
            const data: any = await card.find({ _id: serch }, { img: 0 })
            res.status(201).json({ data })
        } else {
            const data = await card.find({ $or: [ 
                { title: { $regex: serch, $options: 'i' } }, 
                { type: { $regex: serch, $options: 'i' } }, 
                { desc: { $regex: serch, $options: 'i' } }
            ]}, {img: 0})
            .limit(10)
    
            res.status(200).json({ data })
        }

    } catch (error: any) {
        console.log(error);
        res.status(201).json(error.message)
    }
}

export const likesprodacetd = async (req: any, res: Response) => {
    const { name, email: userEmail } = await req.body
    const userId = req.userId
    const prodectId = req.params.id
    const isLIked = await card.findById(prodectId, { likes: 1, _id: 0 }).where("likes.email").equals(userEmail)
    try {

        if (isLIked) {
            const data = await card.findByIdAndUpdate(prodectId, { $pull: { likes: { _id: userId, name: name, email: userEmail } } }, { new: true, likes: 1, _id: 0 })
            return res.status(202).json(data)
        }
        const updataed = await card.findByIdAndUpdate(prodectId, { $push: { likes: [{ _id: userId, name, email: userEmail }] } }, { new: true, likes: 1, _id: 0 })
        res.status(202).json(updataed)

    } catch (error: any) {
        res.status(201).json({ msg: error.message })
        console.log(error)
    }
}

export const getMostLOvedItems = async (req: Request, res: Response) => {
    try {
        const data = await card.find({}, { img: 0 }).sort({ likes: -1 }).limit(9)
        res.status(201).json(data)
    } catch (error: any) {
        res.status(201).json({ msg: error.message })
    }
}

export const upDataProdectd = async (req: Request, res: Response) => {
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

export const deletItem = async (req: Request, res: Response) => {
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

export const commentItem = async (req: Request, res: Response) => {
    const itemID = req.params.id
    const id = uuidv4();
    const { email, name } = req.body.user
    const comment = req.body.comment
    try {
        const result = await card.findByIdAndUpdate(itemID, { $push: { comments: { email: email, name: name, _id: id, comment: comment } } }, { new: true })
        res.status(201).json(result)
    } catch (error: any) {
        res.status(201).json({ msg: error.message })
        console.log(error)
    }
}

export const upDataComment = async (req: Request, res: Response) => {
    const itemID = req.params.id
    const commentId = req.body.id
    const { email, name } = req.body.user
    const newComment = req.body.comment
    try {
        await card.findByIdAndUpdate(itemID, { $pull: { comments: { _id: commentId, name: name, email: email } } }, { new: true }).then(async () => {
            const result = await card.findByIdAndUpdate(itemID, { $push: { comments: { email: email, name: name, _id: commentId, comment: newComment } } }, { new: true })
            res.status(201).json(result)
        })

    } catch (error: any) {
        res.status(201).json({ msg: error.message })
    }
}


export const deleteComment = async (req: Request, res: Response) => {
    const itemID = req.params.id
    const id = req.body.id;
    const { email, name } = req.body.user
    console.log(id, email, name);

    try {
        const updataed = await card.findByIdAndUpdate(itemID, { $pull: { comments: { _id: id, name: name, email: email } } }, { new: true })
        res.status(202).json(updataed)
    }
    catch (error: any) {
        res.status(202).json(error.message)
        console.log(error);
    }
}
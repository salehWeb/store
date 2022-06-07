import payment from '../models/payments'
import card from '../models/card'
import { Request, Response } from 'express'
import { truncate } from 'fs/promises'

export const getPayemanet = async (req: any, res: Response) => {
    const { user, items } = req.body
    const data: any = await card.find({ _id: { $in: items } }, { price: 1, _id: 0 })

    const total = () => {
        let total = 0
        for (let i = 0; i < items.length; i++) {
            total += data[i].price * items[i].q - data[i].price * items[i].discount * items[i].q
        }
        console.log(total)
        return total
    }

    console.log(data)

    try {
        const newPament = new payment({ items, total: total(), user: { email: user.email, name: user.name, _id: req.userId }, sendAt: new Date().toISOString() })
        await newPament.save()
        res.status(201).json({ msg: 'sucses created', data: newPament })
    } catch (error: any) {
        console.log(error);
        res.status(201).json({ msg: error.message })
    }

}

export const admanPayment = async (req: Request, res: Response) => {

    try {

        const data = await payment.find({ isSendIt: false, isCancel: false })

        res.status(201).json(data)

    }
    catch (error: any) {
        console.log(error);
        res.status(201).json({ msg: error.message })
    }

}


export const getPayment = async (req: Request, res: Response) => {
    const id = req.params.id
    try {

        const data = await payment.findById(id, { items: 1 })
        res.status(201).json(data)
        console.log(id);
    }
    catch (error: any) {
        console.log(error);
        res.status(201).json({ msg: error.message })
    }
}



export const sendPayment = async (req: Request, res: Response) => {
    const id = req.params.id
    const items = req.body
    try {

        items.map(async (item: any) => {
            await card.findByIdAndUpdate(item._id, { $inc: { pieces: Number(-item.q) } }, { new: true })
        })

        await payment.findByIdAndUpdate(id, { isSendIt: true }, { new: true })

        res.status(201).json({ msg: 'success' })
    }
    catch (error: any) {
        console.log(error);
        res.status(201).json({ msg: error.message })
    }
}


export const canselPayment = async (req: Request, res: Response) => {
    const id = req.params.id
    try {

        await payment.findByIdAndUpdate(id, { isCancel: true }, { new: true })
        res.status(201).json({ msg: 'success' })
    }
    catch (error: any) {
        console.log(error);
        res.status(201).json({ msg: error.message })
    }
}

export const getHistoryPayments = async (req: Request, res: Response) => {
    const pagetion = req?.query?.pagetion
    const clientTotal = req?.query?.total
    console.log(pagetion)
    console.log(clientTotal)

    try {


        if (!clientTotal) {
            const total = await payment.countDocuments({ $or: [{ isSendIt: true }, { isCancel: true }] })
            const data = await payment.find({ $or: [{ isCancel: true }, { isSendIt: true }] }).limit(8)
            res.status(201).json({ data: data, total: total })
        }

        else {
            const data = await payment.find({ $or: [{ isCancel: true }, { isSendIt: true }] }).limit(8)
            res.status(201).json(data)
        }

    }
    catch (error: any) {
        console.log(error);
        res.status(201).json({ msg: error.message })
    }
}

export const getNewPaymentsSendat = async (req: Request, res: Response) => {
    try {
        const total = await payment.countDocuments({ isSendIt: false, isCancel: false })
        res.status(201).json(total)
    } catch (error: any) {
        res.status(201).json({ msg: error.message })
        console.log(error);
    }
}


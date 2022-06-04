import payment from '../models/payments'
import card from '../models/card'
import {Request, Response} from 'express'

export const getPayemanet = async (req: any, res: Response) => {
    const { user, items } = req.body
    const data = await card.find( { _id: { $in: items } }, { price: 1, _id: 0 })

    const total = () => {
        let total = 0
        for (let i = 0; i < items.length; i++) {
            total += data[i].price * items[i].q - data[i].price * items[i].discount * items[i].q
        }
        console.log(total)
        return total
    }

    console.log(items)

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

        const data = await payment.find()
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

        const data = await payment.findById(id, {items: 1})
        res.status(201).json(data)
        console.log(id);
    } 
    catch (error: any) {
        console.log(error);
        res.status(201).json({ msg: error.message })
    }
    
}
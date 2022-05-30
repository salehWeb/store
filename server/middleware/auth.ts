import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import card from '../models/card'
dotenv.config()

const seacrtJwt: any = process.env.SEACRT_JWT

export const auth = async (req: any, res: any, next: any) => {
    let decodedData: any;
    try {
        const token = req.headers.authorization.split(' ')[1]

        if (token) {
            decodedData = jwt.verify(token, seacrtJwt)
            req.userId = decodedData?.id
            console.log('hello world from auth');
            next()
        }

    } catch (error) {
        console.log(error);
    }
}

export const isAdman = async (req: any, res: any, next: any) => {
    let decodedData: any;
    try {
        const token = req.headers.authorization.split(' ')[1]

        if (token) {
            decodedData = jwt.verify(token, seacrtJwt)
            console.log(decodedData)
            if (decodedData.email !== 'salehwebdev2004@gmail.com') return res.status(200).json({ msg: "user not athorstion" })
            console.log('hello world from admain');
            next()
        }

    } catch (error) {
        res.status(404).send("Sorry can't find that!")
        console.log(error);
    }
}

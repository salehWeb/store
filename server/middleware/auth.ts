import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const seacrtJwt: any = process.env.SEACRT_JWT

export const auth = async (req: any, res: any, next: any) => {
    let decodedData: any;
    try {
        const token = req.headers.authorization.split(' ')[1]
        const isCustomAuth = token.length < 500

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, seacrtJwt)
            req.userId = decodedData?.id
            console.log(decodedData);
        } else {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
            console.log(decodedData);
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

export const isAdman = async (req: any, res: any, next: any) => {
    let decodedData: any;
    try {
        const token = req.headers.authorization.split(' ')[1]
        const isCustomAuth = token.length < 500

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, seacrtJwt)
            if (decodedData.email !== 'salehwebdev2004@gmail.com') return res.status(404).json({ msg: "user not athorstion" })
        } else {
            decodedData = jwt.decode(token)
            if (decodedData.email !== 'salehwebdev2004@gmail.com') return res.status(404).json({ msg: "user not athorstion" })
        }
        next()
    } catch (error) {
        console.log(error);
    }
}
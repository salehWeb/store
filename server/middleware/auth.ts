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

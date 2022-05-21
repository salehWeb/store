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
            decodedData = jwt.verify(token, seacrtJwt, (err: any, user: any) => {
                if (err) {
                    console.log(err);
                    return res.status(404).json({ msg: "user not found"})
                } else {
                    console.log(user)
                }
            })
            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }
        next()
    } catch (error) {
        console.log(req.headers);
    }
}

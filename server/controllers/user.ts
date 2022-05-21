import user from '../models/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const seacrtJwt: any = process.env.SEACRT_JWT

export const hell = async (req: any, res: any) => {
    res.status(200).json({ msg: 'hello world'})
}

export const login = async (req: any, res: any) => {
    const { name, email, password }: any = await req.body
    const isHaveAcount: any = await user.findOne({ email: email })

    try {

        if (isHaveAcount) {
            console.log(' this account is already exist!. try login.');
            return res.status(201).json({ msg: " this account is already exist!. try login." })
        }

        const salt = bcrypt.genSaltSync(10)

        const hashPassword = await bcrypt.hashSync(password, salt)

        const USER: any = new user({
            name: name,
            email: email,
            password: hashPassword,
            createdAt: new Date().toISOString()
        })

        await USER.save()
        res.status(201).json({ msg: " acount sucssfuly created " })
    }

    catch (error: any) {
        console.log(error)
        return res.status(404).json({ msg: error.message })
    }
}




export const reggstar = async (req: any, res: any, next: any) => {
    const { name, email, password }: any = await req.body
    const isHaveAcount: any = await user.findOne({ email: email })

    try {

        const isRigthPassword = await bcrypt.compareSync(password, isHaveAcount.password)

        if (!isRigthPassword) {
            return res.status(201).json({ msg: " password is wrong Try agin!. " })
        }

        const token = jwt.sign({ id: isHaveAcount._id }, seacrtJwt, {
            expiresIn: "3d"
        })


        res.status(200).json({ msg: " login sucsas ", user: isHaveAcount, token })


    } catch (error: any) {

        if (!isHaveAcount) {
            console.log('wrong');
            return res.status(201).json({ msg: " the email is wrong try agin!. or sing in if do not have an account " })
        }

        res.status(404).json({ msg: error.message })
        console.log(error)
    }

}







export const logout = async (req: any, res: any, next: any) => {
    const { name, email, password }: any = await req.body
    const isHaveAcount: any = await user.findOne({ email: email })
    try {

        if (!isHaveAcount) {
            return res.status(201).json({ msg: " the email is wrong try agin!. " })
        } else {

            const isRigthPassword = await bcrypt.compareSync(password, isHaveAcount.password)

            if (!isRigthPassword) {
                return res.status(201).json({ msg: " password is wrong Try agin!. " })
            }

        }

        const deleteacount: any = await user.deleteOne({ email: email })

        deleteacount && res.status(201).json({ msg: " acount deleted sucsasfoly " })

    } catch (error: any) {
        console.log(error)
        res.status(404).json({ msg: error.message })
    }
}






























// export const virfyToken = async (req: any, res: any, next: any) => {
//     const cookies = req.headers.cookie
//     const token = cookies?.split("=")[1]

//     try {

//         if (!token) {
//             return res.status(404).json({ msg: "No token Found" })
//         }

//         jwt.verify(token, seacrtJwt, (err: any, user: any) => {

//             if (err) {
//                 return res.status(404).json({ msg: " Invald token!!. " })
//             }

//             req.id = user.id
//         })

//         next()

//     } catch (error: any) {
//         console.log(error);
//         return res.status(404).json({ msg: "No token Found" + error.message })
//     }
// }



// export const getUser = async (req: any, res: any) => {
//     const userID = await req.id
//     let USER;

//     try {
//         USER = await user.findById({ _id: userID }, { password: 0 })

//         if (!USER) {
//             return res.status(404).json({ msg: "user Not Found!." })
//         }

//     } catch (error: any) {
//         console.log(error);
//         return res.status(404).json({ msg: error.message })
//     }

//     res.status(200).json({ USER })

// }


// export const refreshToken = async (req: any, res: any, next: any) => {
//     const cookies = req.headers.cookie
//     console.log(req.headers)
//     const token = cookies?.split("=")[1]

//     if (!token) {
//         return res.status(200).json({ msg: "user not Authorization"})
//     } 

//     jwt.verify(String(token), seacrtJwt, (err: any, user: any) => {
//         if (err) {
//             console.log(err);
//             return res.status(404).json({ msg: err.message })
//         }

//         res.clearCookie(`${user.id}`)
//         req.cookies[`${user.id}`] = ""

//         const newToken = jwt.sign({ id: user.id }, seacrtJwt, {
//             expiresIn: "55s"
//         })

//         res.cookie(String(user.id), newToken, {
//             path: '/',
//             expires: new Date(Date.now() + 1000 * 30),
//             httpOnly: true,
//             sameSite: 'lax'
//         })

//         req.id = user.id

//         next()
//     })
// }

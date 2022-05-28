import user from '../models/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const seacrtJwt: any = process.env.SEACRT_JWT

export const loginGoogle = async (req: any, res: any) => {
    const { name, email }: any = await req.body
    const isHaveAcount: any = await user.findOne({ email: email })

    try {


        if (isHaveAcount) {
            console.log(' this account is already exist!. try login.');
            return res.status(201).json({ msg: " this account is already exist!. try login." })
        }

        if (email === 'salehwebdev2004@gmail.com') {
            const USER: any = new user({
                name: name,
                email: email,
                isAdman: true,
                createdAt: new Date().toISOString()
            })
            await USER.save()
        } 
        else {
            const USER: any = new user({
                name: name,
                email: email,
                createdAt: new Date().toISOString()
            })
            await USER.save()
        }

        res.status(201).json({ msg: " acount sucssfuly created " })
    }

    catch (error: any) {
        console.log(error)
        return res.status(404).json({ msg: error.message })
    }
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

        if (email === 'salehwebdev2004@gmail.com' && password === 'salehwebdev') {
            const USER: any = new user({
                name: name,
                email: email,
                password: hashPassword,
                isAdman: true,
                createdAt: new Date().toISOString()
            })
            await USER.save()
        } 
        else {
            const USER: any = new user({
                name: name,
                email: email,
                password: hashPassword,
                createdAt: new Date().toISOString()
            })
            await USER.save()
        }

        res.status(201).json({ msg: " acount sucssfuly created " })
    }

    catch (error: any) {
        console.log(error)
        return res.status(404).json({ msg: error.message })
    }
}

export const reggstarGoogle = async (req: any, res: any) => {
    const { email }: any = await req.body
    console.log(email)
    const isHaveAcount: any = await user.findOne({ email: email })

    try {

        const token = jwt.sign({ id: isHaveAcount._id }, seacrtJwt, {
            expiresIn: "3d"
        })


        res.status(200).json({ msg: " login sucsas ", user: { email: isHaveAcount.email, name: isHaveAcount.name, isAdman: isHaveAcount.isAdman }, token })


    } catch (error: any) {

        if (!isHaveAcount) {
            return res.status(201).json({ msg: " the email is wrong try agin!. or sing in if do not have an account " })
        }

        res.status(404).json({ msg: error.message })
        console.log(error)
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


        res.status(200).json({ msg: " login sucsas ", user: { email: isHaveAcount.email, name: isHaveAcount.name }, token })


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



export const getAllUsers = async (req: any, res: any) => {
    try {
        const users: any = await user.find({}, { password: 0 })
        res.status(201).json(users)
    } catch (error: any) {
        res.status(200).json({ msg: error.message })
    }
}

export const deletUser = async (req: any, res: any) => {
    const id = req.params.id
    console.log(id)
    try {
        await user.findByIdAndDelete(id)
        res.status(201).json({msg: 'delete it sucses'})
    } catch (error: any) {
        res.status(201).json({ msg: error.message})
        console.log(error)
    }
}
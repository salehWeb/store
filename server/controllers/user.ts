import user from '../models/user'
import bcrypt from 'bcryptjs'

export const login = async (req: any, res: any, next: any) => {
    const { name, email, password }: any = await req.body
    console.log(req.body)
    try {
        const isHaveAcount: any = await user.findOne({ email: email })

        if (isHaveAcount) {
            return res.status(404).json({ msg: " this account is already exist!. try login." })
        }

        else {
            const salt = bcrypt.genSaltSync(10)

            const hashPassword = await bcrypt.hashSync(password, salt)

            const USER: any = new user({
                name: name,
                email: email,
                password: hashPassword,
                createdAt: new Date().toISOString()
            })

            await USER.save()
            res.status(204).json(USER)
        }

    }

    catch (error: any) {
        console.log(error)
        return res.status(404).json({ msg: error.message })
    }


}

export const reggstar = async (req: any, res: any, next: any) => {
    const { name, email, password }: any = await req.body

    try {
        const isHaveAcount: any = await user.findOne({ email: email })
        const isRigthPassword = await bcrypt.compareSync(password, isHaveAcount.password)


        if (!isHaveAcount) {
            console.log('wrong');
            return res.status(404).json({ msg: " the email is wrong try agin!. or singin if do not have account " })
        }


        if (!isRigthPassword) {
            console.log('wrong');
            return res.status(404).json({ msg: " password is wrong Try agin!. " })
        }

        console.log(isRigthPassword);

        res.status(200).json({ msg: " login sucsas " })
    } catch (error: any) {
        res.status(404).json({ msg: error.message })
        console.log(error)
    }
}
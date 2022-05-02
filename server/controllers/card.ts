import card from "../models/card";

export const postCard = async (req: any, res: any) => {
    const data  = await req.body;
    const newCard = new card({ ...data, creatAt: new Date().toISOString() });
    try {
        await newCard.save()
        res.status(201).json(res.statusMessage)
    } catch (error) {
        res.status(409).json(error)
        console.log(error);
    }
}

export const getCard = async (req: any, res: any) => {
    try {
        const data: any = await card.find().sort({'date': -1}).limit(2)
        res.status(201).json(data)
    } catch (error) {
        res.status(409).json({ msg: error })
    }
}
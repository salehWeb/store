import card from "../models/card";

export const postCard = async (req: any, res: any) => {
    const data  = await req.body.data;
    console.log(data);
    const newCard = new card({ ...data, creatAt: new Date().toISOString() });
    try {
        await newCard.save()
        res.status(201).json(newCard)
    } catch (error) {
        res.status(409).json({ msg: error })
    }
}
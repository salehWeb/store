import card from "../models/card";

export const postCard = async (req: any, res: any) => {
    const data = await req.body;
    if (String(data.desc) && String(data.title) && Number(data.price) && Number(data.pieces) && String(data.type) && String(data.img)) {

        const newCard = new card({ ...data, creatAt: new Date().toISOString() });
        try {
            await newCard.save()
            res.status(201).json(res.statusMessage)
        } catch (error) {
            res.status(409).json(error)
            console.log(error);
        }
    } else {
        res.status(404).json( { msg: 'unvalued data' } )
    }
}

export const getCard = async (req: any, res: any) => {
    try {
        const data: any = await card.find({}, { img: 0})
        res.status(201).json(data)
    } catch (error) {
        res.status(409).json({ msg: error })
    }
}


export const getImg = async (req: any, res: any) => {
    const id = req.params.id
    try {
        console.log(id);
        const { img }: any = await card.findById(id, { img: 1, _id: 0 })
        res.status(201).json(img)
    } catch (error) {
        res.status(409).json({ msg: error })
    }
}
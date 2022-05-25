import card from "../models/card";



export const getOneCard = async (req: any, res: any) => {
    const id = req.params.id
    try {
        const data = await card.findById(id, { likes: 1, _id: 1 })
        res.status(201).json(data)
    } catch (error: any) {
        console.log(error)
        res.send(error.message)
    }
}

export const postCard = async (req: any, res: any) => {
    const data = await req.body;
    if (String(data.desc) && String(data.title) && Number(data.price) && Number(data.pieces) && String(data.type) && String(data.img)) {

        const newCard = new card({ ...data, createdAt: new Date().toISOString() });
        try {
            await newCard.save()
            res.status(201).json(res.statusMessage)
        } catch (error) {
            res.status(409).json(error)
            console.log(error);
        }
    } else {
        res.status(404).json({ msg: 'unvalued data' })
    }
}

export const getCard = async (req: any, res: any) => {
    try {
        const data: any = await card.find({}, { img: 0 })
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

export const sershQurey = async (req: any, res: any) => {
    const sersh = req.query.qurey
    const data = await card.find({ $or: [{ title: sersh }, { type: sersh }, { desc: sersh }, { _id: sersh }] })

    res.status(200).json({ data })
}

export const likesprodacetd = async (req: any, res: any) => {
    const data = await req.body
    console.log(data);
    try {
        const updataed = await card.findByIdAndUpdate(data._id, data, { new: true })
        res.status(202).json(updataed)
    } catch (error) {
        console.log(error)
    }

}
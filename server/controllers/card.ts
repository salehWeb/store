import card from "../models/card";

export const postCard = async (req: any, res: any) => {
    const data = await req.body;
    console.log(String(data.desc));
    console.log(String(data.title));
    console.log(Number(data.price));
    console.log(Number(data.pieces));
    console.log(String(data.type));
    console.log(String(data.img).slice(0, 5));
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
        console.log('error as hole');
        res.status(404).json({msg: 'unvaled data'})
    }
}

export const getCard = async (req: any, res: any) => {
    try {
        const data: any = await card.find({}, { img: 0 })
        console.log(data);
        res.status(201).json(data)
    } catch (error) {
        res.status(409).json({ msg: error })
    }
}


export const getImg = async (req: any, res: any) => {
    const id = req.params.id
    try {
        const { img }: any = await card.findById(id, { img: 1, _id: 0 })
        res.status(201).json(img)
    } catch (error) {
        res.status(409).json({ msg: error })
    }
}
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCard } from '../context/actions'
import { getImage } from '../server'

const CardData = () => {
    const dispatch: any = useDispatch()
    const { data }: any = useSelector((state: any) => state.card)

    useEffect(() => {
        dispatch(getCard())
    }, [dispatch])

    let img: any = []; 
    let images: any = [];

    data && data.map(({_id}: any) => {
        img.push([..._id].join(''))
    })



    img.map( async (id: String) => {
        await getImage(id).then(({ data }) => {
            images.push([...data, data].join(''))
        })
    })

    console.log(images[0]);

    return (
        <>
            {data && data.map((item: any, index: number) => (
                <div className='flex flex-col justify-center items-center'>
                    <img src={images[index]}  alt={`${index}`} />
                    <p>{item.title}</p>
                    <p>{item.price}</p>
                    <p>{item.desc}</p>
                </div>
            ))}
        </>
    )
}

export default CardData
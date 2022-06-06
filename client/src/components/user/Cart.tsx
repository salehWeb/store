import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionTypes from '../../context/actionTypes'
import { getCard } from '../../context/Cardactions'
import { getImage } from '../../server/index'
import CardCom from './CardCom'
import EmtyCart from './EmtyCart'
import Loader from '../tools/Loader'
import { AnimatePresence } from 'framer-motion'
import TotalCard from './TotalCard'


const Cart = () => {
    const dispatch: any = useDispatch()

    useEffect(() => { dispatch(getCard()) }, [dispatch])

    const { cards: Cards, data } = useSelector((state: any) => state.card)

    const [cards, setCards] = useState(Cards)
    const [Total, setTotal] = useState(0)

    useEffect(() => { setCards(Cards) }, [Cards])
    useEffect(() => { dispatch({ type: actionTypes.SET_CARD }) }, [dispatch])


    const handelDelet = (id: any) => {
        const filterd = cards?.filter((item: any) => item._id !== id)
        setCards(filterd)
        localStorage.setItem('cardItems', JSON.stringify(filterd))
        dispatch({ type: actionTypes.SET_CARD })
    }

    const ahveEleman: any = localStorage.getItem('cardItems') || []

    if (JSON.parse(ahveEleman).length === 0) {
        localStorage.setItem('total', JSON.stringify(0))
    }



    useEffect(() => {
        const haveTotal = localStorage.getItem('total')
        const total = haveTotal && JSON.parse(haveTotal)
        setTotal(total)
    }, [Cards, cards])


    const isAdmanasc = async (id: string) => await getImage(id).then((item: any) => item.data)


    return (
        <section className='w-full h-auto flex justify-center items-center min-h-screen bg-Blur rounded-lg py-2 px-6'>
            {data ? (
                <>
                
                    {cards && cards?.length > 0 ? (
                        <div className="w-full h-auto gap-4 grid lg:grid-cols-2 grid-cols-1  min-h-screen">
                        <div className="w-full h-full gap-4 flex flex-col ">
                            {data && cards.map((item: any) => {
                                return (
                                    <AnimatePresence >
                                        <CardCom key={item._id} data={item} Cards={cards} item={item._id} handelDelet={handelDelet} isAdmanasc={isAdmanasc} />
                                    </AnimatePresence >
                                )
                            })}
                            
                        </div>
                        <TotalCard key={'total'} Total={Total} />
                        </div>
                    ) : (
                        <div className="min-w-[100vh] min-h-[60vh] justify-center items-center w-full h-full gap-4 flex flex-col ">
                            <EmtyCart />
                        </div>
                    )}
                    
                </>
            ) : (
                <Loader />
            )}
        </section>
    )
}

export default Cart
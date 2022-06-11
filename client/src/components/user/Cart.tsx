import { useEffect, useState } from 'react'
import CardCom from './CardCom'
import EmtyCart from './EmtyCart'
import Loader from '../tools/Loader'
import { AnimatePresence } from 'framer-motion'
import TotalCard from './TotalCard'
import * as actionTypes from '../../context/actionTypes'
import { useDispatch } from 'react-redux'


const Cart = () => {
    const dispatch = useDispatch()
    const [Cards, setCards] = useState<any>([])
    const isHAveCart: any = localStorage.getItem('cardItems')
    const [reRenderTotal, setRerenderToatl] = useState(false)
    
    useEffect(() => {
        setCards(JSON.parse(isHAveCart))
    }, [])

    const [Total, setTotal] = useState(0)

    const handelDelet = (id: any) => {
        const filterd = Cards?.filter((item: any) => item._id !== id)
        localStorage.setItem('cardItems', JSON.stringify(filterd))
        dispatch({type: actionTypes.SET_CARD})
        setCards(filterd)
    }


    if (JSON.parse(isHAveCart).length === 0) {
        localStorage.setItem('total', JSON.stringify(0))
    }

    const HandelGetTotalPrice = () => {
        let baby = 0;
        for (let i = 0; i < Cards.length; i++) {
            baby += Cards[i].Total
        }
        localStorage.setItem('total', JSON.stringify(baby))
        return baby
    }

    useEffect(() => {
        HandelGetTotalPrice()
        const haveTotal = localStorage.getItem('total')
        const total = haveTotal && JSON.parse(haveTotal)
        setTotal(total)
    }, [reRenderTotal])

    useEffect(() => {
        HandelGetTotalPrice()
        const haveTotal = localStorage.getItem('total')
        const total = haveTotal && JSON.parse(haveTotal)
        setTotal(total)
    })






    return (
        <section className='w-full h-auto flex justify-center items-center min-h-screen bg-Blur rounded-lg py-2 px-6'>
            {Cards ? (
                <>
                    {Cards && Cards?.length > 0 ? (
                        <div className="w-full h-auto gap-4 grid lg:grid-cols-2 grid-cols-1  min-h-screen">
                            <div className="w-full h-full gap-4 flex flex-col ">
                                {Cards && Cards.map((item: any) => {
                                    return (
                                        <>
                                            <AnimatePresence key={item._id}>
                                                <CardCom item={item} setRerenderToatl={setRerenderToatl} Cards={Cards} handelDelet={handelDelet} />
                                            </AnimatePresence >
                                        </>
                                    )
                                })}
                            </div>
                            <TotalCard Total={Total} />
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
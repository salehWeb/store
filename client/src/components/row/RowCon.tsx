import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MdShoppingCart, MdAddTask } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import * as actionTypes from '../../context/actionTypes'
import Loader from '../tools/Loader'
import RowChald from './RowChald'

const RowCon = ({ flag, slide, data }: any) => {
    const dispatch = useDispatch()


    useEffect(() => { dispatch({ type: actionTypes.SET_CARD }) }, [dispatch])

    const { cards } = useSelector((state: any) => state.card)

    const [items, setItems] = useState(cards)
    
    useEffect(() => { setItems(cards) }, [cards])




    const handelAdd = async (itemey: any) => {
        items?.length <= 0 ? setItems([itemey]) : setItems([...items, itemey]);

        await localStorage.setItem(`cardItems`, JSON.stringify(items))

        dispatch({ type: actionTypes.SET_CARD })
    }


    const slideRef: any = useRef<HTMLDivElement>()
    const cardRef: any = useRef<HTMLDivElement>()

    useEffect(() => {
        slideRef.current.scrollLeft = slide * slideRef?.current?.clientWidth
    }, [slide, cardRef])

    return (

        <div ref={slideRef} className={`w-full flex items-center gap-3   scroll-smooth  
        ${flag
                ? "overflow-x-scroll scrollbar-none"
                : "overflow-x-hidden flex-wrap justify-center my-12"
            }`}>
                
            {!data ? <Loader /> : data.map((item: any) => (
                    <RowChald  items={items}  key={item._id}  item={item} MdShoppingCart={MdShoppingCart} cards={cards} MdAddTask={MdAddTask} handelAdd={handelAdd} motion={motion}/>
            ))}

        </div>
    )
}

export default RowCon
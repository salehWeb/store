import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MdShoppingCart, MdAddTask } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import * as actionTypes from '../context/actionTypes'
import Loader from './Loader'
import RowChald from './RowChald'

const RowCon = ({ flag, slide, data }: any) => {
    const dispatch = useDispatch()
    const { cards } = useSelector((state: any) => state.card)
    useEffect(() => { dispatch({ type: actionTypes.SET_CARD }) }, [dispatch])

    const [items, setItems] = useState(cards || [])






    // items && localStorage.setItem(`cardItems`, JSON.stringify(items))

    const handelAdd = (itemey: any) => {

        dispatch({ type: actionTypes.SET_CARD })


        items?.length <= 0 ? setItems([itemey._id]) : setItems([...items, itemey._id]);


        localStorage.setItem(`cardItems`, JSON.stringify(items))


    }


    const slideRef: any = useRef<HTMLDivElement>()
    const cardRef: any = useRef<HTMLDivElement>()

    useEffect(() => {
        slideRef.current.scrollLeft = slide * cardRef?.current?.clientWidth
    }, [slide, cardRef])

    return (
        <div ref={slideRef} className={`w-full flex items-center gap-3  my-12 scroll-smooth  
        ${flag
                ? "overflow-x-scroll scrollbar-none"
                : "overflow-x-hidden flex-wrap justify-center"
            }`}>
            {!data ? <Loader /> : data.map((item: any) => (
                    <RowChald  items={items}  cardRef={cardRef} item={item} MdShoppingCart={MdShoppingCart} cards={cards} MdAddTask={MdAddTask} handelAdd={handelAdd} motion={motion}/>
            ))}
        </div>
    )
}

export default RowCon
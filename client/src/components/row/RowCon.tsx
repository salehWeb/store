import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MdShoppingCart, MdAddTask } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import * as actionTypes from '../../context/actionTypes'
import Loader from '../tools/Loader'
import RowChald from './RowChald'

const RowCon = ({ flag, data, loved }: any) => {
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

    const [scrollWidth, setScrollWidth] = useState(0)
    const slideRef: any = useRef<HTMLDivElement>()

    useEffect(() => {
        setScrollWidth(slideRef?.current?.scrollWidth - slideRef?.current?.offsetWidth)
    }, [slideRef?.current?.offsetWidth, slideRef?.current?.scrollWidth])

    return (

        <div ref={slideRef} className={`w-full flex items-center gap-3  scroll-smooth  
        ${flag
                ? "overflow-x-scroll scrollbar-none "
                : "overflow-x-hidden flex-wrap justify-center my-12"
            }`}>
            {loved ? (
                <motion.div drag="x"
                    whileTap={{ cursor: "grabbing" }}
                    dragConstraints={{ right: 0, left: -scrollWidth }}
                    className="w-full flex gap-4 cursor-grab flex-row items-center justify-between">
                    {!data ? <Loader /> : data.map((item: any, index: number) => (
                        <RowChald loved={loved} items={items} index={index} key={item._id} item={item} MdShoppingCart={MdShoppingCart} cards={cards} MdAddTask={MdAddTask} handelAdd={handelAdd} motion={motion} />
                    ))}
                </motion.div>
            ) : (
                !data ? <Loader /> : data.map((item: any, index: number) => (
                    <RowChald loved={loved} items={items}  key={item._id} index={index} item={item} MdShoppingCart={MdShoppingCart} cards={cards} MdAddTask={MdAddTask} handelAdd={handelAdd} motion={motion} />
                ))
            )}


        </div>
    )
}

export default RowCon
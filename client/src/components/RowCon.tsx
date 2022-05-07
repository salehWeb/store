import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MdShoppingCart } from 'react-icons/md'
import iamge from '../img/d7.png'
import { useDispatch, useSelector } from 'react-redux'
import { getCard } from '../context/actions'
import Loader from './Loader'

const RowCon = ({ flag, slide, data }: any) => {

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
            {!data ? <Loader /> : data.map(({ img, _id, price, desc, title, type }: any) => (
                <div ref={cardRef} key={_id} className="bg-Blur w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px] rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative">
                    <div className="w-full flex items-center justify-between">
                        <motion.div whileHover={{ scale: 1.15 }} className='w-40 h-40 -mt-8 drop-shadow-2xl'>
                            <img src={img} alt='ewew' className='w-full h-full object-contain' />
                        </motion.div>
                        <motion.div whileTap={{ scale: 0.6 }} className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8">
                            <MdShoppingCart className='text-white' />
                        </motion.div>
                    </div>
                    <div className="w-full flex flex-col items-end justify-end -mt-8">
                        <p className="text-gray-700 md:text-lg text-semibold text-base">{title}</p>
                        <div className="flex items-center gap-8">
                            <p className='text-lg text-gray-700 font-semibold'>
                                <span className='text-sm text-blue-600'>$</span>{price}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RowCon
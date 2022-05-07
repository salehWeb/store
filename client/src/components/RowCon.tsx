import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { MdShoppingCart } from 'react-icons/md'
import iamge from '../img/d7.png'
import { useDispatch, useSelector } from 'react-redux'
import { getCard } from '../context/actions'
import Loader from './Loader'

const RowCon = ({ flag }: any) => {
    const dispatch: any = useDispatch()
    const { data }: any = useSelector((state: any) => state.card)

    useEffect(() => {
        dispatch(getCard())
    }, [dispatch])


    return (
        <div className={`w-full my-12 bg-blue-200 items-center flex ${!flag ? 'overflow-x-scroll' : 'overflow-x-hidden'}`}>
            {!data ? <Loader /> : data.map(({img, _id, price, desc, title, type}: any) => (
                <div key={_id} className="h-auto w-full bg-Blur md:w-[350px] backdrop-blur-2xl hover:drop-shadow-md p-4  my-12 shadow-2xl">
                    <div className="w-full flex items-center justify-between">
                        <motion.img whileHover={{ scale: 1.15 }} src={img} alt='ewew' className='w-40 -mt-8' />
                        <motion.div whileTap={{ scale: 0.6 }} className="w-7 h-7 flex cursor-pointer hover:shadow-lg items-center justify-center rounded-full bg-pink-600">
                            <MdShoppingCart className='text-white' />
                        </motion.div>
                    </div>
                    <div className="w-full flex flex-col gap-4 items-end justify-end">
                        <p className="text-gray-700 md:text-lg text-semibold text-base">{title} & {title}</p>
                        <p className='mt-1 text-sm text-gray-500 '>{desc}</p>
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
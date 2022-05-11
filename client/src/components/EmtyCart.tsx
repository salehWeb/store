import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdHome } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'

const EmtyCart = () => {
    const history = useNavigate()

    const handelHome = () => {
        history('/')
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: 400, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ opacity: 0.8, x: -700, scale: 1 }}
                className="w-full ease-in-out transition-all duration-100 h-full min-h-[50vh] flex flex-col justify-center items-center">
                <div className="bg-red-400 rounded-lg p-8 h-12 flex justify-center items-center">
                    <h1 className='text-base text-semibold  justify-center items-center'>look like your cart is empty!.</h1>
                </div>
                <div className="flex w-full h-full  rounded-lg justify-center items-center">
                    <p className="flex hover:underline cursor-pointer hover:text-blue-500">Go to Home</p> <MdHome onClick={handelHome} className='text-blue-400 flex text-2xl cursor-pointer hover:text-blue-600' />
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default EmtyCart
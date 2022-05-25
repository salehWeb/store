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

            <div className='w-full ease-in-out transition-all duration-100 h-full min-h-[50vh] flex flex-col justify-center items-center'>


            <motion.div
                initial={{ x: 400, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ opacity: 0.8, x: -700, scale: 1 }}
                className=" ease-in-out transition-all duration-100  flex flex-col justify-center items-center">
                <div className="bg-red-400 rounded-lg p-8 h-12 flex justify-center items-center">
                    <h1 className='text-base text-semibold  justify-center items-center'>look like your cart is empty!.</h1>
                </div>
                </motion.div>

                <motion.div
                initial={{ x: -400, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ opacity: 0.8, x: 700, scale: 1 }}
                className=" ease-in-out transition-all  mt-44  duration-100  flex flex-col justify-center items-center">

                <div className="flex rounded-lg justify-center items-center">
                    <p className="flex hover:underline text-blue-400 text-2xl items-center justify-center cursor-pointer hover:text-blue-600" onClick={handelHome}><MdHome />Go to Home</p>
                </div>
            </motion.div>
            </div>

        </AnimatePresence>
    )
}

export default EmtyCart
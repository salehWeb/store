import { useNavigate } from 'react-router-dom'
import { MdHome } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import emptyCart from '../../img/empty-cart.svg'

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
                    <div className="bg-Blur rounded-lg p-8 lg:flex-row xl:flex-row md:flex-row  flex-col flex justify-center items-center">
                        <h1 className='text-2xl  justify-center items-center'>look like your cart is empty!.</h1>
                        <motion.img
                            initial={{ x: 400, opacity: 0, scale: 0.8 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            exit={{ opacity: 0.8, x: -700, scale: 1 }}
                            className='object-contain flex justify-center items-center'
                            src={emptyCart} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: -400, opacity: 0, scale: 0.8 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.8, x: 700, scale: 1 }}
                    className=" ease-in-out transition-all  mt-20  duration-100  flex flex-col justify-center items-center">

                    <div className="flex rounded-lg justify-center items-center">
                        <p className="flex hover:underline text-blue-400 text-2xl items-center justify-center cursor-pointer hover:text-blue-600" onClick={handelHome}><MdHome />Go to Home</p>
                    </div>
                </motion.div>
            </div>

        </AnimatePresence>
    )
}

export default EmtyCart
import NotFoundImage from '../../img/404-not-found.png'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MdHome } from 'react-icons/md'

const NotFound = () => {
    const history = useNavigate()

    const handelHome = () => {
        history('/')
    }
    return (
        <>
            <div className='min-h-[60vh] flex items-center justify-center'>
                <img src={NotFoundImage} alt="Not Found" />
            </div>

            <motion.div
                initial={{ x: -400, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ opacity: 0.8, x: 700, scale: 1 }}
                className=" ease-in-out transition-all  mt-20  duration-100  flex flex-col justify-center items-center">

                <div className="flex rounded-lg justify-center items-center">
                    <p className="flex hover:underline text-blue-400 text-2xl items-center justify-center cursor-pointer hover:text-blue-600" onClick={handelHome}><MdHome />Go to Home</p>
                </div>
            </motion.div>
        </>
    )
}

export default NotFound
import Logo from '../img/logo.png'
import Profile from '../img/avatar.png'
import { MdShoppingCart } from 'react-icons/md'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Header = () => {
    const classes = {
        li: 'text-base text-gray-600 hover:text-gray-800 duration-100 transition-all cursor-pointer ease-in-out'
    }
    return (
        <header className='w-screen fixed z-50 bg-slate-100 p-6 px-16'>
            <div className="hidden h-full w-full md:flex justify-between ">
                <Link to='/' className="flex items-center gap-2">
                    <img src={Logo} alt='logo' className='w-9 cursor-pointer object-cover' />
                    <p className='font-bold text-xl text-gray-800 cursor-pointer'> City </p>
                </Link>
                <div className="flex justify-center gap-8 items-center">
                    <ul className='flex items-center gap-8'>
                        <li className={classes.li}>Home</li>
                        <li className={classes.li}>Menu</li>
                        <li className={classes.li}>About Us</li>
                        <li className={classes.li}>Service</li>
                    </ul>
                    <div className="flex relative items-center justify-center">
                        <MdShoppingCart className='text-gray-600 text-2xl cursor-pointer' />
                        <div className="w-5 h-5 absolute -top-2 -right-2 rounded-full flex items-center justify-center bg-red-600">
                            <p className='text-sm text-white font-semibold'>2</p>
                        </div>
                    </div>
                    <div className="relative">
                        <motion.img className='w-10 rounded-full cursor-pointer drop-shadow-xl h-10 min-w-[40px] min-h-[40px]'
                            whileTap={{ scale: 0.6 }} src={Profile} alt='profile' />
                    </div>
                </div>
            </div>
            <div className="flex h-full w-full md:hidden "></div>
        </header>
    )
}

export default Header
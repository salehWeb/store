import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MdHome, MdShoppingCart } from 'react-icons/md'

const SideBar = ({ cards }: any) => {
    const [open, setOpen] = useState(false)
    const haveAnacount = localStorage.getItem('profile')
    const isAdman = haveAnacount && JSON.parse(haveAnacount).user?.isAdman

    return (
        <>

            <div onClick={() => setOpen(!open)} className="block w-8  left-1/2 top-1/2  z-[2] ">
                {cards > 0 ? (
                    <div className="w-5 h-5 z-[100] absolute -top-2 -right-2 rounded-full flex items-center justify-center bg-red-600">
                        <p className='text-sm text-white font-semibold'>{cards}</p>
                    </div>
                ) : null}
                <span aria-hidden="true" className={`${open && ' -rotate-[315deg] translate-y-1.5 '} block h-[2px] w-8 mb-[4px] bg-current transform transition duration-[600ms] ease-in-out`}></span>
                <span aria-hidden="true" className={`block  h-[2px] w-8 bg-current transform transition duration-[600ms] ease-in-out ${open && 'opacity-0'} `}></span>
                <span aria-hidden="true" className={`${open && ' rotate-[315deg] -translate-y-1.5 '} block h-[2px] w-8 mt-[4px] bg-current transform transition duration-[600ms] ease-in-out`}></span>
            </div>

            <AnimatePresence>
                {
                    open && (
                        <motion.div className="w-64 absolute top-[38px] -right-[11px] border-t-[1px]" aria-label="Sidebar"
                            initial={{ x: 400, opacity: 0.8, scale: 0.6 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            exit={{ opacity: 0.8, x: 400, scale: 0.6 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
                                <ul className="space-y-2">
                                    <li>
                                        <a href="/card" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <MdShoppingCart className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                            <span className="flex-1 ml-3 whitespace-nowrap">Cart</span>
                                            {cards >= 1 && (
                                                <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-red-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">{cards}</span>
                                            )}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <MdHome className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                            <span className="flex-1 ml-3 whitespace-nowrap">Home</span>
                                        </a>
                                    </li>
                                    {isAdman === true && (
                                        <>
                                            <li>
                                                <a href="/adman/users" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/adman" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/adman/creatItem" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Creat Product</span>
                                                </a>
                                            </li>
                                        </>
                                    )}
                                    <li>
                                        <a href="/login" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                                            <span className="flex-1 ml-3 whitespace-nowrap">Log In</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/singin" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path></svg>
                                            <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </>
    )
}

export default SideBar



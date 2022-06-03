import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MdHome, MdShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom'

const SideBar = ({ cards, handelSersh, sersh, setSersh }: any) => {
    const [open, setOpen] = useState(false)
    const haveAnacount = localStorage.getItem('profile')
    const isAdman = haveAnacount && JSON.parse(haveAnacount).user?.isAdman

    const handelSerching = () => {
        setOpen(!open)
        handelSersh()
    }


    return (
        <>

            <div onClick={() => setOpen(!open)} className="block w-8  left-1/2 top-1/2  z-[2] ">
                {cards > 0 ? (
                    <div className="w-5 h-5 z-[100] absolute -top-2 -right-2 rounded-full flex items-center justify-center bg-red-600">
                        <p className='text-sm text-white font-semibold'>{cards}</p>
                    </div>
                ) : null}
                <span aria-hidden="true" className={`${open && ' -rotate-[315deg] translate-y-2 '} block h-[2px] w-8 mb-[7px] bg-current transform transition duration-[600ms] ease-in-out`}></span>
                <span aria-hidden="true" className={`block  h-[2px] w-8 bg-current transform transition duration-[600ms] ease-in-out ${open && 'opacity-0'} `}></span>
                <span aria-hidden="true" className={`${open && ' rotate-[315deg] -translate-y-2 '} block h-[2px] w-8 mt-[7px] bg-current transform transition duration-[600ms] ease-in-out`}></span>
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
                                        <Link to="/card" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                                            <MdShoppingCart className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                                            <span className="flex-1 ml-3 whitespace-nowrap">Cart</span>
                                            {cards >= 1 && (
                                                <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full ">{cards}</span>
                                            )}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                                            <MdHome className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                                            <span className="flex-1 ml-3 whitespace-nowrap">Home</span>
                                        </Link>
                                    </li>
                                    {isAdman === true && (
                                        <>
                                            <li>
                                                <Link to="/adman/users" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/adman" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/adman/creatItem" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Creat Product</span>
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                    <li>
                                        <Link to="/login" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                                            <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                                            <span className="flex-1 ml-3 whitespace-nowrap">Log In</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/singin" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                                            <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path></svg>
                                            <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
                                        </Link>
                                    </li>
                                    <li className="flex justify-center  items-center p-2 md:hidden text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                                        <div className=" relative flex items-center w-full">
                                            <input type="search" value={sersh} onChange={(e) => setSersh(e.target.value)} className="relative focus:drop-shadow-2xl flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal max-h-fit text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-2xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                                            <button onClick={handelSerching} className=" px-3 ml-2 hover:rounded-2xl rounded py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                                </svg>
                                            </button>
                                        </div>
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
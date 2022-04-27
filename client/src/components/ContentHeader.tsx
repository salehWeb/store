import React from 'react'

const ContentHeader = ({ logo, MdLogout, MdLogin, MdLibraryAdd, isUserFind, mune, Link, motion, Profiles, MdShoppingCart, handelFailure, handelMune, classes, isAdmanFind, Client_ID, GoogleLogin, handelLogout, handelSuccess }: any) => {
    return (
        <>
            <div className="hidden h-full w-full md:flex justify-between ">
                <Link to='/' className="flex items-center gap-2">
                    <img src={logo} alt='logo' className='w-9 cursor-pointer object-cover' />
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

                        <GoogleLogin
                            clientId={Client_ID}
                            render={(prop: any) => (
                                <button
                                    disabled={isUserFind}
                                    onClick={prop.onClick}
                                >
                                    <motion.img onClick={handelMune} className='w-10 rounded-full ease-in-out cursor-pointer drop-shadow-xl h-10 min-w-[40px] min-h-[40px]'
                                        whileTap={{ scale: 0.6 }} src={Profiles} alt='profile' /> </button>
                            )}
                            onSuccess={handelSuccess}
                            onFailure={handelFailure}
                        />
                        {mune && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 right-2 text-center bg-gray-50 shadow-xl flex flex-col rounded-lg absolute">
                                <p onClick={handelLogout} className='hover:bg-gray-300 rounded-lg transition-all duration-100 text-base ease-in-out cursor-pointer px-2 py-2 mb-1 flex flex-row items-center content-between justify-between'>{isUserFind ? 'logout' : 'login'}{isUserFind ? <MdLogout /> : <MdLogin />}</p>
                                {isAdmanFind && (
                                    <Link to={'/creatItem'}>
                                        <p className='border-b-[1px] border-gray-400'></p>
                                        <p className='hover:bg-gray-300 rounded-lg transition-all duration-100 text-base ease-in-out cursor-pointer px-2 py-2 mt-1 flex flex-row items-center content-between justify-between'>New Item <MdLibraryAdd /> </p>
                                    </Link>
                                )
                                }
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex h-full w-full md:hidden "></div>
        </>
    )
}

export default ContentHeader
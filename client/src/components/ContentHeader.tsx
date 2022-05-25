import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as actionTypes from '../context/actionTypes'
import { sesrshQurey } from "../server"

const ContentHeader = ({ userFind, MdDesignServices, MdHome, MdRestaurant, MdAccountBalance, logo, MdLogout, MdLogin, MdLibraryAdd, mune, Link, motion, Profiles, MdShoppingCart, handelFailure, handelMune, classes, isAdmanFind, Client_ID, GoogleLogin, handelLogout, handelSuccess }: any) => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const { cards: Cards } = useSelector((state: any) => state.card)


    useEffect(() => { dispatch({ type: actionTypes.SET_CARD }) }, [dispatch])


    useEffect(() => { setCards(Cards?.length) }, [Cards])

    const handelReduric = () => {
        console.log('dirct me');
        history('/card')
    }
    const [sersh, setSersh] = useState('')

    const handelSersh = async () => {
        if (sersh) {
            console.log(sersh);
        }
        await sesrshQurey(sersh).then(res => console.log(res)).catch(err => console.log(err))
    }

    const [cards, setCards] = useState(0)



    return (
        <>
            <div className="hidden h-full w-full md:flex justify-between ">
                <Link to='/' className="flex items-center gap-2">
                    <img src={logo} alt='logo' className='w-9 cursor-pointer object-cover' />
                    <p className='font-bold text-xl text-gray-800 cursor-pointer'> Selexome </p>
                </Link>
                <div className="flex justify-center gap-8 items-center">
                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className='flex items-center gap-8'>
                        <li className={classes.li}>Home</li>
                        <li className={classes.li}>Menu</li>
                        <li className={classes.li}>About Us</li>
                        <li className={classes.li}>Service</li>
                        <li className="flex justify-center">
                            <div className="xl:w-96">
                                <div className=" relative flex items-center w-full">
                                    <input type="search" onChange={(e) => setSersh(e.target.value)} className="relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                                    <button onClick={handelSersh} className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </motion.ul>
                    <div onClick={handelReduric} className="flex relative items-center justify-center">
                        <MdShoppingCart className='text-gray-600 text-2xl cursor-pointer' />
                        {cards > 0 ? (
                            <div className="w-5 h-5 absolute -top-2 -right-2 rounded-full flex items-center justify-center bg-red-600">
                                <p className='text-sm text-white font-semibold'>{cards}</p>
                            </div>
                        ) : null}
                    </div>
                    <div className="relative">
                        <GoogleLogin
                            clientId={Client_ID}
                            render={(prop: any) => (
                                <button
                                    disabled={userFind}

                                >
                                    <motion.img onClick={handelMune} className='w-10 rounded-full ease-in-out cursor-pointer drop-shadow-xl h-10 min-w-[40px] min-h-[40px]'
                                        whileTap={{ scale: 0.6 }} src={Profiles} alt='profile'
                                    />
                                </button>
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
                                <p onClick={handelLogout} className='hover:bg-gray-300 rounded-lg transition-all duration-100 text-base ease-in-out cursor-pointer px-2 py-2 mb-1 flex flex-row items-center content-between justify-between'>{userFind ? 'logout' : 'login'}{userFind ? <MdLogout /> : <MdLogin />}</p>
                                {isAdmanFind && (
                                    <Link to={'/creatItem'}>
                                        <p onClick={handelMune} className='border-b-[1px] border-gray-400'></p>
                                        <p onClick={handelMune} className='hover:bg-gray-300 rounded-lg transition-all duration-100 text-base ease-in-out cursor-pointer px-2 py-2 mt-1 flex flex-row items-center content-between justify-between'>New Item <MdLibraryAdd /> </p>
                                    </Link>
                                )
                                }
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
            {/*  mobil view  */}
            <div className="flex h-full items-center justify-between w-full md:hidden ">

                <div onClick={handelReduric} className="flex relative items-center justify-center">
                    <MdShoppingCart className='text-gray-600 text-2xl cursor-pointer' />
                    {cards > 0 ? (
                        <div className="w-5 h-5 absolute -top-2 -right-2 rounded-full flex items-center justify-center bg-red-600">
                            <p className='text-sm text-white font-semibold'>{cards}</p>
                        </div>
                    ) : null}
                </div>

                <Link to='/' className="flex items-center gap-2">
                    <img src={logo} alt='logo' className='w-9 cursor-pointer object-cover' />
                    <p className='font-bold text-xl text-gray-800 cursor-pointer'> City </p>
                </Link>

                <div className="relative">
                    <GoogleLogin
                        clientId={Client_ID}
                        render={(prop: any) => (
                            <button
                                disabled={userFind}

                            >
                                <motion.img onClick={handelMune} className='w-10 rounded-full ease-in-out cursor-pointer drop-shadow-xl h-10 min-w-[40px] min-h-[40px]'
                                    whileTap={{ scale: 0.6 }} src={Profiles} alt='profile' /> </button>
                        )}
                        onSuccess={handelSuccess}
                        onFailure={handelFailure}
                    />
                    {/* sersh mobil view 
                    
                    <div className="flex justify-center">
                        <div className="mb-3 xl:w-96">
                            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                                <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                                <button className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
*/}
                    {mune && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className="w-40 right-2 text-center bg-gray-50 shadow-xl flex flex-col rounded-lg absolute">
                            <p className={classes.p} onClick={handelMune} >Home <MdHome /></p>
                            <p className={classes.p} onClick={handelMune} >Menu <MdRestaurant /></p>
                            <p className={classes.p} onClick={handelMune} >About Us <MdAccountBalance /></p>
                            <p className={classes.p} onClick={handelMune} >Service <MdDesignServices /></p>
                            <p className='border-b-[1px] border-gray-400'></p>
                            <p onClick={handelLogout} className='hover:bg-gray-300 hover:shadow-md rounded-lg transition-all duration-100 text-base ease-in-out cursor-pointer px-2 py-2 mb-1 flex flex-row items-center content-between justify-between'>{userFind ? 'logout' : 'login'}{userFind ? <MdLogout /> : <MdLogin />}</p>
                            {isAdmanFind && (
                                <Link to={'/creatItem'}>
                                    <p className='border-b-[1px] border-gray-400'></p>
                                    <p className={classes.p}
                                        onClick={handelMune}
                                    >New Item <MdLibraryAdd /> </p>
                                </Link>
                            )
                            }
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ContentHeader
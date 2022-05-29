import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as actionTypes from '../../context/actionTypes'
import { sesrshQurey } from "../../server"
import SideBar from "./SideBar"

const ContentHeader = ({ userFind, MdDesignServices, MdHome, MdRestaurant, MdAccountBalance, logo, MdLogout, MdLogin, MdLibraryAdd, mune, Link, motion, Profiles, MdShoppingCart, handelFailure, handelMune, classes, Client_ID, GoogleLogin, handelLogout, handelSuccess }: any) => {
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

    const isUser = localStorage.getItem('profile')
    const user = isUser && JSON.parse(isUser).user.name


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
                        <li className={classes.li}>{localStorage.getItem("profile") ? 'Logout' : 'Login'}</li>

                        <li className="flex justify-center">
                            <div className="xl:w-96">
                                <div className=" relative flex items-center w-full">
                                    <input type="search" onChange={(e) => setSersh(e.target.value)} className="relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                                    <button onClick={handelSersh} className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li className={classes.li}>
                            <div onClick={handelReduric} className="flex relative items-center justify-center">
                                <MdShoppingCart className='text-gray-600 text-2xl cursor-pointer' />
                                {cards > 0 ? (
                                    <div className="w-5 h-5 absolute -top-2 -right-2 rounded-full flex items-center justify-center bg-red-600">
                                        <p className='text-sm text-white font-semibold'>{cards}</p>
                                    </div>
                                ) : null}
                            </div>
                        </li>
                        <li className={classes.li}>
                            <motion.img onClick={handelMune} className='w-10 rounded-full ease-in-out cursor-pointer drop-shadow-xl h-10 min-w-[40px] min-h-[40px]'
                                whileTap={{ scale: 0.6, rotate: 180 }} src={`https://avatars.dicebear.com/api/bottts/${user}.svg`} alt='profile'
                            />
                        </li>
                        <li className=' text-base text-gray-600 duration-100 transition-all cursor-pointer ease-in-out relative mr-4'>
                            <SideBar cards={cards} />
                        </li>

                    </motion.ul>
                </div>
            </div>





            {/*  mobil view  */}

            <motion.ul
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                className='flex items-center relative justify-between md:hidden'>


                <li className={classes.li}>
                    <motion.img onClick={handelMune} className='w-10 rounded-full ease-in-out cursor-pointer drop-shadow-xl h-10 min-w-[40px] min-h-[40px]'
                        whileTap={{ scale: 0.6, rotate: 180 }} src={`https://avatars.dicebear.com/api/bottts/${user}.svg`} alt='profile' />
                </li>

                <li className='text-base text-gray-600 duration-100 transition-all cursor-pointer ease-in-out'>
                    <Link to='/' className="flex items-center gap-2">
                        <img src={logo} alt='logo' className='w-9 cursor-pointer object-cover' />
                        <p className='font-bold text-xl text-gray-800 cursor-pointer'> Selexome </p>
                    </Link>
                </li>



                <li className=' text-base text-gray-600 duration-100 transition-all cursor-pointer ease-in-out relative mr-4 '>
                    <SideBar cards={cards} />
                </li>
            </motion.ul>

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
        </>
    )
}

export default ContentHeader
import Logo from '../img/logo.png'
import Profile from '../img/avatar.png'
import { MdShoppingCart,MdHome, MdDesignServices, MdAccountBalance, MdRestaurant, MdLogout, MdLogin, MdLibraryAdd } from 'react-icons/md'
import { motion } from 'framer-motion'
import { isAdman, isUser } from '../controls'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import { Client_ID } from '../Secret.js';
import * as actionTypes from '../context/actionTypes'
import ContentHeader from './ContentHeader'


const Header = () => {
    let type: any;
    const dispatch = useDispatch();
    const  user: any = useSelector<typeof  type>((state) => state.auth)

const [isUserFind, setIsUserFind] = useState(isUser)
const [isAdmanFind, setIsAdmanFind] = useState(isAdman)
const [userFind, setUserFind] = useState(user)
const [mune, setMune] = useState(false)


    const handelSuccess = async (res: any) => {
        if (!isUserFind) {
            const { profileObj, tokenId } = await res
            const user: Object = { profile: profileObj, token: tokenId }
            dispatch({ type: actionTypes.SET_USER, payload: user })
            setIsUserFind(true)
            setIsAdmanFind(true)
            setUserFind(user)
            setMune(false)
        }
    }
    const handelMune = () => {
        setMune(!mune)
    }

    const handelFailure = (error: String) => {
        console.log(error)
    }

    const handelLogout = () => {
        dispatch({ type: actionTypes.LOGOUT})
        setIsUserFind(false)
        setIsAdmanFind(false)
        setMune(false)
    }


    let Profiles: any;
    if (isUserFind && userFind && userFind?.profile?.imageUrl) {
        Profiles = userFind.profile?.imageUrl
    } else {
        Profiles = Profile
    }

    const classes = {
        li: 'text-base text-gray-600 hover:text-blue-800 duration-100 transition-all cursor-pointer ease-in-out',
        p: 'hover:bg-gray-300 rounded-lg transition-all duration-100 text-base ease-in-out cursor-pointer px-2 py-2 mt-1 flex flex-row items-center content-between justify-between'
    }

    return (
        <header className='w-screen shadow-md shadow-blue-300  fixed z-50 bg-slate-100 py-3 px-4 md:p-6 md:px-16'>
            <ContentHeader 
            setMune={setMune}
            classes={classes}
            motion={motion}
            Profiles={Profiles}
            handelMune={handelMune}
            handelLogout={handelLogout}
            handelFailure={handelFailure}
            logo={Logo}
            MdLogout={MdLogout}
            MdLogin={MdLogin}
            handelSuccess={handelSuccess}
            MdLibraryAdd={MdLibraryAdd}
            isUserFind={isUserFind}
            mune={mune}
            Link={Link}
            isAdmanFind={isAdmanFind}
            MdShoppingCart={MdShoppingCart}
            Client_ID={Client_ID}
            GoogleLogin={GoogleLogin}
            MdDesignServices={MdDesignServices}
            MdAccountBalance={MdAccountBalance}
            MdRestaurant={MdRestaurant}
            MdHome={MdHome}
            /> 
        </header>
    )
}

export default Header
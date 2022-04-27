import Logo from '../img/logo.png'
import Profile from '../img/avatar.png'
import { MdShoppingCart, MdLogout, MdLogin, MdLibraryAdd } from 'react-icons/md'
import { motion } from 'framer-motion'
import { user, isAdman, isUser } from '../controls'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import { Client_ID } from './Secret';
import * as actionTypes from '../context/actionTypes'
import ContentHeader from './ContentHeader'


const Header = () => {
    const dispatch = useDispatch();

    const [isUserFind, setIsUserFind] = useState(isUser)
    const [isAdmanFind, setIsAdmanFind] = useState(isAdman)
    const [userFind, setUserFind] = useState(user)
    const [mune, setMune] = useState(false)


    const handelSuccess = async (res: any) => {
        if (!isUserFind) {
            const { profileObj } = res
            const { tokenId } = res
            const user: any = { profile: profileObj, token: tokenId }
            dispatch({ type: actionTypes.SET_USER, payload: user })
            localStorage.setItem('user', JSON.stringify(user))
            setIsUserFind(true)
            setIsAdmanFind(true)
            setUserFind(user)
        }
    }
    const handelMune = () => {
        if (isUserFind) {
            setMune(!mune)
        }
    }

    const handelFailure = (error: String) => {
        console.log(error)
    }

    const handelLogout = () => {
        localStorage.removeItem('user')
        setIsUserFind(false)
        setIsAdmanFind(false)
    }

    let Profiles: string;
    if (isUserFind && userFind) {
        Profiles = userFind.profile.imageUrl
    } else {
        Profiles = Profile
    }

    const classes = {
        li: 'text-base text-gray-600 hover:text-gray-800 duration-100 transition-all cursor-pointer ease-in-out',
    }

    return (
        <header className='w-screen fixed z-50 bg-slate-100 p-6 px-16'>
            <ContentHeader 
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
            /> 
        </header>
    )
}

export default Header
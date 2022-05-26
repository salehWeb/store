import Logo from '../../img/logoFood1.png'
import Profile from '../../img/avatar.png'
import { MdShoppingCart,MdHome, MdDesignServices, MdAccountBalance, MdRestaurant, MdLogout, MdLogin, MdLibraryAdd } from 'react-icons/md'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import { Client_ID } from '../../Secret.js';
import * as actionTypes from '../../context/actionTypes'
import ContentHeader from './ContentHeader'


const Header = ({ haed }: any) => {
    const history = useNavigate()
    let type: any;
    const dispatch = useDispatch();
    const  { user } : any = useSelector<typeof  type>((state) => state.auth)


    
    useEffect(() => {
        if (localStorage.getItem('user')) {
            dispatch({type: actionTypes.GET_USER})
        }
    }, [dispatch])

    useEffect(() => {
        setUserFind(user)
    }, [user])


const [userFind, setUserFind] = useState(user)
const [mune, setMune] = useState(false)


    const handelSuccess = async (res: any) => {
        if (!userFind) {
            const { profileObj, tokenId } = await res
            const user: Object = { profile: profileObj, token: tokenId }
            dispatch({ type: actionTypes.SET_USER, payload: user })
            setUserFind(user)
            setMune(false)
        }
    }

    const handelMune = () => {
        setMune(!mune)
    }

    const handelFailure = (error: any) => {
        console.log(error.message)
    }

    const handelLogout = () => {
        dispatch({ type: actionTypes.LOGOUT})
        setMune(false)
    }

    let Profiles: any;
            
            if (userFind?.profile?.imageUrl) {
                Profiles = userFind.profile?.imageUrl
            } else {
                Profiles = Profile
            }

    const classes = {
        li: 'text-base text-gray-600 hover:text-blue-800 duration-100 transition-all cursor-pointer ease-in-out hover:underline',
        p: 'hover:bg-gray-300 rounded-lg transition-all duration-100 text-base ease-in-out cursor-pointer px-2 py-2 mt-1 flex flex-row items-center content-between justify-between'
    }


    

    return (
        <header  className={`${haed ? ' rounded-[25px] mt-1 px-8 ' : ' px-4  md:px-16'} w-screen p-[11px] ease-in-out duration-100 transition-all shadow-md shadow-blue-300  fixed z-50 bg-Blur`} >
            <ContentHeader 
            userFind={userFind}
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
            mune={mune}
            Link={Link}
            MdShoppingCart={MdShoppingCart}
            Client_ID={Client_ID}
            GoogleLogin={GoogleLogin}
            MdDesignServices={MdDesignServices}
            MdAccountBalance={MdAccountBalance}
            MdRestaurant={MdRestaurant}
            MdHome={MdHome}
            history={history}
            /> 
        </header>
    )
}

export default Header
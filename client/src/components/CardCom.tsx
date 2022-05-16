import React, { useEffect, useState } from 'react'
import { BsCartDashFill } from 'react-icons/bs'
import Loader from './Loader'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import * as actionTypes from '../context/actionTypes'

const CardCom = ({ item, handelDelet, isAdmanasc, data, Cards }: any) => {
    const dispatch = useDispatch()
    const [image, setImage] = useState('')
    const [Total, setTotal] = useState(data.Total / data.price || 1)

    const handeNone = () => {
        let baby = 0;
        Cards.reduce((total: any, curnt: any) => {
            baby += curnt.Total
        }, 0)
        console.log(baby);
        return baby
    } 

    

    useEffect(() => {

        if (!data.Total) {
            data.Total = data.price
        }

        handeNone()

        localStorage.setItem('cardItems', JSON.stringify(Cards))
        dispatch({ type: actionTypes.SET_CARD })

        // localStorage.setItem('total', JSON.stringify(handeNone()))

    }, [Total, dispatch])

    useEffect(() => {
        localStorage.setItem('total', JSON.stringify(handeNone()))
    }, [Cards])


    const IMAGE = async () => {
        await isAdmanasc(item).then((data: any) => {
            setImage(data)
        })
    }

    useEffect(() => { IMAGE() }, [item])

    const handelAdd = () => {
        setTotal(Total + 1)
        const totrfdo = Total + 1
        data.Total = totrfdo * data.price
    }

    const handleEncramnt = () => {
        setTotal(Total - 1)
        const totrfdo = Total - 1
        data.Total = totrfdo * data.price
    }

    return (
        <motion.div
            initial={{ x: 400, opacity: 0, scale: 0.2 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ opacity: 0.8, x: 700, scale: 1 }}
            key={data._id} className="w-full my-6 h-full ease-in-out duration-100 transition-all flex bg-white rounded-lg">
            <div className="flex relative h-full w-[50%] flex-row flex-wrap justify-between rounded-lg">
                <div  className="bg-gray-800 shadow-lg   rounded-lg  -top-7 left-[75px] w-[39%] h-10 items-center justify-center flex  absolute">
                    <p className="text-gray-500">price $:{data.price}</p>
                </div>
                {!image ? (
                    <div className="flex h-32 w-[25rem] justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="h-32 w-[25rem] flex   rounded-lg  bg-white ">
                        <img className=' w-full h-full object-contain' src={image} alt={data.title} />
                    </div>
                )}
                <div className="h-32 w-[25rem] flex rounded-lg justify-center items-center">
                    <BsCartDashFill onClick={() => handelDelet(item)} className='flex text-[2rem] cursor-pointer hover:from-red-400 hover:text-red-700 transition-all bg-gradient-to-tr from-red-300 to-red-60  text-red-500  rounded-lg ' />
                </div>
            </div>
            <div className=" w-full h-full flex flex-end flex-col  justify-center items-center">
                <p className="text-base  ">{data.title}
                    <span className='h-[1px] w-full   bg-gradient-to-tr from-blue-300 to-blue-600  flex flex-row'></span></p>
                <br />
                <p className="text-gray-500 flex self-start">{data.desc} wegewge ebeberberbe ebrebebreb erbreberbreb egrebreberb brebre</p>
                <div className="flex self-end h-full rounded-lg justify-end mr-4 my-6 bg-gray-800">
                    <div className="p-2 flex flex-row">

                        <span onClick={handelAdd} className="flex text-white cursor-pointer text-base ">+</span>

                        <span className="flex bg-gradient-to-tr rounded-lg px-2 mx-2 from-blue-300 text-base  to-blue-600 ">{Total}</span>

                        {Total >= 2 ? (
                            <span onClick={handleEncramnt} className="flex text-white cursor-pointer text-base ">-</span>
                        ) : (
                            <span className="flex text-gry-500 cursor-pointer text-base ">-</span>
                        )}

                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default CardCom
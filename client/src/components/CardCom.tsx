import React, { useEffect, useState } from 'react'
import { BsCartDashFill } from 'react-icons/bs'

const CardCom = ({ item, handelDelet, isAdmanasc }: any) => {
    const [image, setImage] = useState('')

    const IMAGE = async () => {
        await isAdmanasc(item).then((data: any) => {
            setImage(data)
        })
    } 

    useEffect(() => {IMAGE()}, [])




    return (
        <div key={item._id} className="w-full my-6 h-full flex bg-white rounded-lg">
            <div className="flex relative h-full w-[50%] flex-row flex-wrap justify-between rounded-lg">

                <div className="bg-gray-800 shadow-lg  rounded-lg  -top-7 left-[75px] w-[39%] h-10 items-center justify-center flex  absolute">
                    <p className="text-gray-500">price:{item.price}</p>
                </div>

                <div className="h-32 w-[25rem] flex   rounded-lg  bg-white ">
                    <img className=' w-full h-full object-contain' src={image} alt={item.title} />
                </div>

                <div className="h-32 w-[25rem] flex rounded-lg justify-center items-center">
                    <BsCartDashFill onClick={() => handelDelet(item._id)} className='flex text-[2rem] cursor-pointer hover:from-red-400 hover:text-red-700 transition-all bg-gradient-to-tr from-red-300 to-red-60  text-red-500  rounded-lg ' />
                </div>
            </div>
            <div className=" w-full h-full flex flex-end flex-col  justify-center items-center">
                <p className="text-base  ">{item.title}
                    <span className='h-[1px] w-full   bg-gradient-to-tr from-blue-300 to-blue-600  flex flex-row'></span></p>
                <br />
                <p className="text-gray-500 flex self-start">{item.desc} wegewge ebeberberbe ebrebebreb erbreberbreb egrebreberb brebre</p>
                <div className="flex self-end h-full rounded-lg justify-end mr-4 my-6 bg-gray-800">
                    <div className="p-2 flex flex-row">
                        <span className="flex text-white cursor-pointer text-base ">+</span>
                        <span className="flex bg-gradient-to-tr rounded-lg px-2 mx-2 from-blue-300 text-base  to-blue-600 ">5</span>
                        <span className="flex text-white cursor-pointer text-base ">-</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardCom
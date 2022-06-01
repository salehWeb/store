import { useEffect, useState } from 'react'
import Loader from '../tools/Loader'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import * as actionTypes from '../../context/actionTypes'
import { getCartUser, likesProdectd } from '../../server'
import { MdOutlineCancelPresentation } from 'react-icons/md'

const CardCom = ({ item, handelDelet, isAdmanasc, data, Cards }: any) => {
    const dispatch = useDispatch()
    const [image, setImage] = useState('')
    const [Total, setTotal] = useState(data.Total / data.price || 1)
    const [likesC, setLikes] = useState(false)

    const haveAnacount = localStorage.getItem('profile')

    const { user } = haveAnacount && JSON.parse(haveAnacount)


    const handeNone = () => {
        let baby = 0;
        Cards.reduce((total: any, curnt: any) => {
            baby += curnt.Total
        }, 0)
        return baby
    }

    const userEmail: any = `${user.email}`
    const userName: any = `${user.name}`


    useEffect(() => {
        const getLikes = async () => {
            await getCartUser(data._id).then((res: any) => {
                res.data.likes.map((item: any) => {
                    console.log(item)
                    if (item.email === userEmail) {
                        setLikes(true)
                    } else {
                        setLikes(false)
                    }
                })
            }).catch((error: any) => console.log(error))
        }
        getLikes()
    }, [likesC, userEmail, data._id])

    const handelLikes = async () => {
        setLikes(!likesC)
        await likesProdectd(data._id, { email: userEmail, name: userName }).then(res => {
            res.data.likes.map((item: any) => {
                if (item.email === userEmail) {
                    setLikes(true)
                } else {
                    setLikes(false)
                }
            })
        })
            .catch(error => console.log(error))
    }



    useEffect(() => {

        if (!data.Total) {
            data.Total = data.price
        }



        handeNone()

        localStorage.setItem('cardItems', JSON.stringify(Cards))
        dispatch({ type: actionTypes.SET_CARD })


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
        if (Total < data.pieces) {
            setTotal(Total + 1)
            const totrfdo = Total + 1
            data.Total = totrfdo * data.price
        }
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
            key={data._id} className="w-full my-6 h-fit ease-in-out flex-col duration-100 transition-all drop-shadow-lg flex bg-white rounded-lg">
            <div className="flex  w-full h-fit flex-row flex-wrap justify-between rounded-lg">

                {!image ? (
                    <div className="flex h-32 justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="h-32  flex relative  rounded-lg justify-center items-center w-full bg-white ">
                        <MdOutlineCancelPresentation onClick={() => handelDelet(item)} className='flex ml-[2px] top-0 left-0 mt-[2px] text-[2rem] p-[6px] cursor-pointer absolute hover:from-red-400 hover:text-red-700 transition-all bg-gradient-to-tr from-red-300 to-red-60  text-red-500  rounded-lg ' />
                        <img className=' w-full  h-full object-contain' src={image} alt={data.title} />

                        <div className="bg-gray-800 shadow-lg  max-w-fit rounded-lg  -top-7 right-[5%] px-[6px] absolute h-10 items-center justify-center  z-[4] flex ">
                            <p className="text-gray-300">price $:{data.price}</p>
                        </div>

                    </div>
                )}

                <div className="flex  h-fit flex-col justify-center items-center rounded-lg">
                    <p className="text-base  w-fit"><h1 className='text-2xl'>{data.title}</h1>
                        <span className='h-[1px] w-full   bg-gradient-to-tr from-blue-300 to-blue-600  flex flex-row'></span></p>
                    <br />
                    <p className="text-gray-500 flex self-start px-4">{data.desc} wegewge ebeberberbe ebrebebreb erbreberbreb egrebreberb brebre</p>
                </div>
            </div>




            <div className=" w-full h-full flex flex-end flex-col  justify-center items-center">



                <div className="flex h-fit w-full justify-between flex-row items-center">

                    <div className="flex justify-center items-center ml-2">
                        <p className="font-semibold">

                            {data.pieces - Total >= 1

                                ? `${data.pieces - Total > 1

                                    ? `items left: ${data.pieces - Total}`
                                    : 'one item left !'}`

                                : 'sorry no item left'}

                        </p>
                    </div>

                    <div className="flex self-end h-fit  rounded-lg justify-end mr-4 my-6 bg-gray-800">

                        <div className="p-2 flex flex-row">

                            {Total === data.pieces ? (
                                <span className="flex bg-gray-500 rounded-lg justify-between px-1 self-center text-base ">+</span>
                            ) : (
                                <span onClick={handelAdd} className="flex bg-blue-400 px-1 self-center rounded-lg text-white cursor-pointer text-base ">+</span>
                            )}

                            <span className="flex bg-gradient-to-tr rounded-lg px-2 mx-2 from-blue-300 text-base  to-blue-600 ">{Total}</span>

                            {Total >= 2 ? (
                                <span onClick={handleEncramnt} className="flex  px-1 self-center bg-blue-400 rounded-lg text-white cursor-pointer text-base ">-</span>
                            ) : (
                                <span className="flex bg-gray-500 rounded-lg px-1 self-center text-base ">-</span>
                            )}

                        </div>

                    </div>
                    <div className="flex justify-center items-center mr-3 ">
                        <motion.button
                            whileTap={{ scale: 0.6 }}
                            onClick={handelLikes} className={`flex-none flex items-center ease-in-out duration-[50] transition-all justify-center w-9 h-9 rounded-md ${likesC ? 'text-red-600 shadow-md shadow-red-500 border-red-300' : 'text-slate-300 border-slate-200'} border `} type="button" aria-label="Like">
                            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default CardCom
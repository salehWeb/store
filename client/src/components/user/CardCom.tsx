import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getCartUser, getImage, likesProdectd } from '../../server'
import { MdOutlineCancelPresentation } from 'react-icons/md'
import LoderBtn from '../tools/LoderBtn'
import { Loader } from '../tools'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const CardCom = ({ handelDelet, item, setRerenderToatl, Cards }: any) => {
    const history = useNavigate()
    const [Total, setTotal] = useState(1)
    const [likesC, setLikes] = useState(false)
    const [likeLength, setLikeLength] = useState(item?.likes?.length)
    const [isLoadingLike, setIsLoadingLike] = useState(false)
    const [image, setImage] = useState('')


    useEffect(() => {
        const getImageServer = async () => {
            const { data } = await getImage(item._id)
            setImage(data.img)
        }
        getImageServer()
    }, [])


    const haveAnacount = localStorage.getItem('profile')

    useEffect(() => {
        if (item) {
            setTotal(item.Total / (item.price - (item.price * item.discount)))
        }
    }, [])

    const user = haveAnacount && JSON.parse(haveAnacount)?.user

    const userEmail: any = `${user?.email}`
    const userName: any = `${user?.name}`


    useEffect(() => {
        setIsLoadingLike(true)
        const getLikes = async () => {
            await getCartUser(item._id).then((res: any) => {
                setLikeLength(res.data.likes.length)
                res.data.likes.map((item: any) => {
                    if (item.email === userEmail) {
                        setLikes(true)
                    } else {
                        setLikes(false)
                    }
                })
            }).catch((error: any) => console.log(error))
        }
        getLikes()
        setIsLoadingLike(false)
    }, [userEmail, item._id])



    const handelLikes = async () => {
        if (haveAnacount) {
            setIsLoadingLike(true)
            setLikes(!likesC)
            if (!likesC) {
    
                setLikeLength(likeLength + 1)
            } else {
                setLikeLength(likeLength - 1)
            }
            await likesProdectd(item._id, { email: userEmail, name: userName })
                .catch(error => console.log(error))
            setIsLoadingLike(false)
        } else {
            Swal.fire({
                title: 'You must login to like',
                icon: 'warning',
                confirmButtonText: 'Login',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                cancelButtonColor: '#d33',
                confirmButtonColor: '#3085d6',
                reverseButtons: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                focusConfirm: false,
                focusCancel: false,
                preConfirm: () => {
                    history('/login')
                }
            })

        }

    }



    useEffect(() => {

        if (!item.Total) {
            item.Total = item.price - (item.price * item.discount)
        }

        localStorage.setItem('cardItems', JSON.stringify(Cards))

    }, [Total])



    const handelAdd = () => {
        if (Total < item.pieces) {
            setTotal(Total + 1)
            const totrfdo = Total + 1
            setRerenderToatl((re: Boolean) => !re)
            item.Total = totrfdo * (item.price - item.price * item.discount)
        }
    }

    const handleEncramnt = () => {
        setTotal(Total - 1)
        const totrfdo = Total - 1
        setRerenderToatl((re: Boolean) => !re)
        item.Total = totrfdo * (item.price - item.price * item.discount)
    }

    return (
        <AnimatePresence key={item._id}>
            <motion.div
                initial={{ x: 400, opacity: 0, scale: 0.2 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ opacity: 0.8, x: 600, scale: 1 }}
                transition={{ duration: 0.8 }}
                key={item._id} className="w-full my-6 h-fit ease-in-out flex-col duration-100 transition-all drop-shadow-lg flex bg-white rounded-lg">
                <div className="p-8 w-full h-fit flex flex-row flex-wrap lg:grid xl:grid md:grid relative grid-cols-2 rounded-lg">

                    <MdOutlineCancelPresentation onClick={() => handelDelet(item._id)} className='flex ml-[2px] top-0 left-0 mt-[2px] text-[2rem] p-[6px] cursor-pointer absolute hover:from-red-400 hover:text-red-700 transition-all bg-gradient-to-tr from-red-300 to-red-60  text-red-500  rounded-lg ' />

                    {item.discount !== 0 && (
                        <div className="shadow-lg max-w-fit rounded-full  -top-7 left-[5%] drop-shadow-lg absolute h-10 items-center justify-center  z-[4] flex ">
                            <p className="text-gray-100 md:text-lg p-1 rounded-full bg-red-600  flex justify-between text-semibold text-base">{String(item.discount).split(".")[1]}0%</p>

                        </div>
                    )}

                    <div className="bg-gray-800 shadow-lg  max-w-fit rounded-lg  -top-7 right-[5%] px-[6px] absolute h-10 items-center justify-center  z-[4] flex ">

                        {item.discount !== 0 ?
                            (
                                <>

                                    <div className="flex justify-between items-center gap-8 flex-col">
                                        <p className='text-lg text-gray-100 font-semibold flex-row flex'>
                                            <span className='text-sm text-blue-600'>$</span>
                                            <span className="line-through mr-3">
                                                {item.price}
                                            </span>
                                            <span className='text-sm text-blue-600'>$</span>
                                            {Number(item.price - (item.price * item.discount)).toFixed(2)}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="flex justify-between items-center gap-8">
                                    <p className='text-lg text-gray-100 font-semibold flex-row flex'>
                                        <span className='text-sm text-blue-600'>$</span>{item.price}
                                    </p>
                                </div>
                            )}
                    </div>

                    {image ? (
                        <div className="h-32 flex rounded-lg justify-center items-center w-full bg-white ">
                            <img className=' w-full  h-full object-contain' src={image} alt={item.title} />
                        </div>
                    ) : (
                        <div className="h-32 flex rounded-lg justify-center items-center w-full bg-white ">
                            <Loader />
                        </div>
                    )}

                    <div className="flex  h-fit flex-col justify-center items-center rounded-lg">
                        <p className="text-base  w-fit"><span className='text-2xl'>{item.title}</span>
                            <span className='h-[1px] w-full   bg-gradient-to-tr from-blue-300 to-blue-600  flex flex-row'></span></p>
                        <br />
                        <p className="text-gray-500 flex self-start px-4">{item.desc} wegewge ebeberberbe ebrebebreb erbreberbreb egrebreberb brebre</p>
                    </div>
                </div>




                <div className=" w-full h-full flex flex-end flex-col  justify-center items-center">



                    <div className="flex h-fit w-full justify-between flex-row items-center">

                        <div className="flex justify-center items-center ml-2">
                            <p className="font-semibold">

                                {item.pieces - Total >= 1

                                    ? `${item.pieces - Total > 1

                                        ? `items left: ${item.pieces - Total}`
                                        : 'one item left !'}`

                                    : 'sorry no item left'}

                            </p>
                        </div>

                        <div className="flex self-end h-fit  rounded-lg justify-end mr-4 my-6 bg-gray-800">

                            <div className="p-2 flex flex-row">

                                {Total === item.pieces ? (
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
                            {isLoadingLike ? (
                                <LoderBtn Notext={true} />
                            ) : (
                                <motion.button
                                    whileTap={{ scale: 0.6 }}
                                    onClick={handelLikes} className={`flex-none flex flex-col items-center ease-in-out duration-[50] transition-all justify-center w-10 h-10 rounded-md ${likesC ? 'text-red-600 shadow-md shadow-red-500 border-red-300' : 'text-slate-300 border-slate-200'} border `} type="button" aria-label="Like">

                                    <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                    </svg>
                                    <span className="flex text-xs text-gray-400">{likeLength}</span>
                                </motion.button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default CardCom
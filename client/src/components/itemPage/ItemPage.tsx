import { useEffect, useState } from 'react'
import { commentItem, sesrshQurey, likesProdectd, updataComment, getCartUser } from '../../server'
import { motion } from 'framer-motion';
import { Loader } from '../tools';
import Comments from './Comments';
import LoderBtn from '../tools/LoderBtn';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../../context/actionTypes';
import { MdAddTask, MdShoppingCart } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const ItemPage = () => {
    const history = useNavigate()

    const [item, setItem] = useState<any>()
    const [comment, setComment] = useState("")
    const [likesC, setLikes] = useState(false)
    const [isUpdata, setIsUpdata] = useState(false)
    const [data, setData] = useState<any>()
    const [likeLength, setLikeLength] = useState(item?.likes?.length || 0)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingLike, setIsLoadingLike] = useState(false)
    const [commentsData, setCommentsData] = useState([])


    const isHaveAcount = localStorage.getItem('profile')
    const user = isHaveAcount && JSON.parse(isHaveAcount)?.user

    const dispatch = useDispatch()

    useEffect(() => {
        setCommentsData(item?.comments || [])
    }, [item])

    useEffect(() => { dispatch({ type: actionTypes.SET_CARD }) }, [dispatch])

    const { cards } = useSelector((state: any) => state.card)

    const [items, setItems] = useState(cards)

    useEffect(() => {
        setLikeLength(item?.likes?.length)
    }, [item])

    const handelAdd = async (itemey: any) => {
        const {_id, title, type, likes, price, discount, desc, pieces} = itemey;
        const data = { _id, title, type, likes, price, discount, desc, pieces };
        
        cards?.length <= 0 ? setItems([data]) : setItems([...cards, data]);

        await localStorage.setItem(`cardItems`, JSON.stringify(items))

        dispatch({ type: actionTypes.SET_CARD })
    }

    useEffect(() => {
        localStorage.setItem(`cardItems`, JSON.stringify(items))
    }, [items])

    const getItem = async () => {
        if (itemPage) {
            setItem(itemPage)
        } else {
            await sesrshQurey(window.location.search.split("=")[1]).then(async res => {
                setItem(res.data.data[0])
            }).catch((error: any) => console.log(error))
        }
    }

    const handelCansel = () => {
        setComment("")
        setIsUpdata(false)
    }


    const handelSubmitComment = async (e: any) => {
        e.preventDefault()
        if (isHaveAcount) {
            setIsLoading(true)
            if (!isUpdata) {
                if (comment !== "") {
                    const { email, name } = user
                    const data = { comment: comment, user: { email, name } }
                    await commentItem(item._id, data).then(async res => {
                        console.log(res);
                        setComment("")
                        setCommentsData(res.data)
                    }).catch(err => console.log(err))
                }
            } else {
                const { email, name } = user
                const id = data._id
                const endData = { comment, id, user: { email, name } }
                await updataComment(item._id, endData).then(res => {
                    handelCansel()
                    console.log(res);
                    setCommentsData(res.data)
                }).catch(err => console.log(err))
            }
            setIsLoading(false)
        } 
        
        else {
            Swal.fire({
                title: 'You must be logged in to comment',
                icon: 'warning',
                confirmButtonText: 'Login',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    history("/login")
                }
            })
        }

    }

    const { itemPage } = useSelector((state: any) => state.card)


    const userEmail: any = `${user?.email}`

    useEffect(() => {
        if (item) {
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
        }

    }, [item])

    useEffect(() => {
        getItem()
    }, [])

    const handelLikes = async () => {
        if (isHaveAcount) {
            setIsLoadingLike(true)
            setLikes(!likesC)
            if (!likesC) {
                setLikeLength(likeLength + 1)
            } else {
                setLikeLength(likeLength - 1)
            }
            const { email, name } = user
            await likesProdectd(item._id, { email, name }).then(res => {
                setIsLoadingLike(false)
            })
                .catch(error => console.log(error))
            setIsLoadingLike(false)
        } else {
            Swal.fire({
                title: 'You must be logged in to like this item',
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
                    history("/login")
                }
            })
        }

    }


    return (

        <div className='items-center grid grid-cols-1 justify-center w-full min-h-[60vh] sm:px-16 rounded-lg bg-Blur px-8 py-4'>

            {item ? (
                <>
                    <motion.div
                        initial={{ x: 400, opacity: 0, scale: 0.2 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.8, x: 700, scale: 1 }}
                        key={item._id} className="w-full my-6 grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-10  ease-in-out duration-100 transition-all min-h-[50vh] rounded-lg">
                        <div className="flex  w-full flex-row flex-wrap justify-between rounded-lg h-full drop-shadow-lg">


                            <div className="w-full flex relative lg:h-[50vh] md:h-[50vh]  sm:h-[50vh] h-[30vh] rounded-lg  bg-white p-4 ">

                                <img className=' w-full  h-full object-contain' src={item.img} alt={item.title} />

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
                            </div>
                        </div>


                        <div className=" w-full h-full flex flex-col rounded-lg drop-shadow-lg bg-white p-4">

                            <div className={`flex items-center justify-between  mr-3 w-full`}>
                                {isLoadingLike ? (
                                    <div className={`flex items-center -mr-3 justify-center w-10 h-10 `}>
                                        <LoderBtn Notext={true} />
                                    </div>
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
                                {items && items.find((id: any) => id._id === item._id) ?
                                    (
                                        <motion.div whileTap={{ scale: 0.6 }} className="w-8 h-8 rounded-full  bg-gradient-to-tr from-blue-300 to-blue-600   flex items-center justify-center cursor-pointer hover:shadow-md ">
                                            <MdAddTask className='text-white' />
                                        </motion.div>
                                    ) : (
                                        <motion.div whileTap={{ scale: 0.6 }} className="w-8 h-8  duration-75 rounded-full bg-gradient-to-tr  from-red-300 to-red-600 flex items-center justify-center cursor-pointer hover:shadow-md ">
                                            <MdShoppingCart onClick={() => handelAdd(item)} className='text-white' />
                                        </motion.div>
                                    )}
                            </div>

                            <div className="flex items-center justify-center">

                                <h1 className='text-2xl flex flex-col justify-center items-center text-blue-600 mb-10'>{item.title}
                                    <span className='min-h-[1px] min-w-full  bg-gradient-to-tr from-blue-300 to-blue-600  flex '></span>
                                </h1>
                            </div>

                            <p className="text-gray-500 flex ">{item.desc} wegewge ebeberberbe ebrebebreb erbreberbreb egrebreberb brebre</p>

                            <hr className="min-h-[1px] min-w-full  bg-gradient-to-tr mt-4 from-blue-300 to-blue-600  flex" />

                            <div className="flex justify-between items-center flex-row flex-wrap mt-auto">
                                <p className="text-gray-700 ">
                                    items left <span className="text-blue-600 font-semibold text-lg">
                                        {item.pieces}
                                    </span>
                                </p>
                                <p className="text-gray-700 ">
                                    item type <span className="text-blue-600 font-semibold text-lg">
                                        {item.type}
                                    </span>
                                </p>
                            </div>

                        </div>

                    </motion.div>

                    <motion.div
                        initial={{ x: 400, opacity: 0, scale: 0.2 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.8, x: 700, scale: 1 }}
                        className="w-full my-6 grid lg:grid-cols-2 md:grid-cols-2  gap-6  ease-in-out duration-100 transition-all min-h-[50vh] rounded-lg">



                        <div className="w-full flex h-[50vh] max-h-fit justify-center items-center rounded-lg drop-shadow-lg bg-white">
                            <form onSubmit={(e) => handelSubmitComment(e)} className="w-full p-4">
                                <div className="mb-2">
                                    <label htmlFor="comment" className="text-lg text-gray-600">{isUpdata ? "Updata a comment" : "Add a comment"}</label>
                                    <textarea
                                        className="w-full max-h-[35vh] h-[35vh] min-h-[1vh] p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                                        placeholder="Comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    >

                                    </textarea>
                                </div>
                                <div className="flex justify-around item-center">
                                    {isLoading ? (
                                        <button className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded drop-shadow-md
                                        hover:bg-white hover:drop-shadow-2xl hover:text-blue-600 hover:rounded-3xl hover:border hover:border-blue-600 transition-all duration-[130ms] ease-in-out" type="submit" disabled>
                                            <LoderBtn />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded drop-shadow-md
                                            hover:bg-white hover:drop-shadow-2xl hover:text-blue-600 hover:rounded-3xl hover:border hover:border-blue-600 transition-all duration-[130ms] ease-in-out">
                                            {isUpdata ? "Updata" : "Comment"}
                                        </button>
                                    )}

                                    <button
                                        onClick={handelCansel}
                                        className="px-3 py-2 text-sm text-blue-600 border border-blue-500 drop-shadow-md 
                                        hover:bg-blue-600 hover:drop-shadow-2xl hover:text-white hover:rounded-3xl transition-all duration-[130ms] ease-in-out">
                                        Cancel
                                    </button>
                                </div>

                            </form>
                        </div>

                        <div className="flex justify-center  items-center gap-6 flex-col h-fit w-full rounded-lg">
                            {commentsData && commentsData.map((items: any, index: number) => (
                                <Comments getItem={getItem} commentsData={commentsData} setCommentsData={setCommentsData} item={items} user={user} setData={setData} key={items._id + index} id={item._id} setIsUpdata={setIsUpdata} setComment={setComment} />
                            ))}

                        </div>
                    </motion.div>
                </>
            ) : (
                <div className="flex w-full h-full justify-center items-center">
                    <Loader />
                </div>
            )}
        </div>
    )
}

export default ItemPage
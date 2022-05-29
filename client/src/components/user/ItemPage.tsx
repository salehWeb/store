import React, { useEffect, useState } from 'react'
import { commentItem, sesrshQurey, deleteComment } from '../../server'
import { motion } from 'framer-motion';
import { Loader } from '../tools';
import { BsCartDashFill } from 'react-icons/bs';
import { CgMoreR } from 'react-icons/cg'



const ItemPage = () => {
    const [item, setItem] = useState<any>()
    const [comment, setComment] = useState("")
    const isHaveAcount = localStorage.getItem('profile')
    const isAdman = isHaveAcount && JSON.parse(isHaveAcount).user?.isAdman
    const user = isHaveAcount && JSON.parse(isHaveAcount).user


    const getItem = async () => {
        await sesrshQurey(window.location.search.split("=")[1]).then(async res => {
            await setItem(res.data.data[0])
            console.log(user)
        }).catch(error => console.log(error))
    }

    const handelSubmitComment = async (e: any) => {
        e.preventDefault()

        const {email, name} = user

        const data = {comment: comment, user: { email, name }}
        console.log(data);
        await commentItem(item._id, data).then(res => {
            getItem()
        }).catch(err => console.log(err))
    }



    useEffect(() => {

        getItem()
    }, [])

    const handelMore = (id: any) => {
        const {email, name} = user
        deleteComment(item._id, { id, user: { email, name }}).then(res => console.log(res)).catch(err => console.log(err))
    }

    const handelLikes = () => {
        console.log('like')
    }



    const likesC = true
    return (
        <div className='flex items-center justify-center w-full min-h-[60vh] rounded-lg bg-Blur'>
            {item ? (
                <motion.div
                    initial={{ x: 400, opacity: 0, scale: 0.2 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.8, x: 700, scale: 1 }}
                    key={item._id} className="w-full my-6 ease-in-out duration-100 transition-all flex h-full rounded-lg">
                    <div className="flex  w-[50%] flex-row flex-wrap justify-between rounded-lg h-full ">


                        <div className="h-full w-[25rem] flex relative  rounded-lg  bg-white ">
                            <img className=' w-full  h-full object-contain' src={item.img} alt={item.title} />

                            <div className="bg-gray-800 shadow-lg   rounded-lg  -top-7 left-[30%] lg:w-[39%] px-[6px] h-10 items-center justify-center flex  absolute">
                                <p className="text-gray-500">price $:{item.price}</p>
                            </div>
                        </div>
                    </div>


                    <div className=" w-full h-full flex flex-end flex-col  justify-center items-center">
                        <p className="text-base  "><h1 className='text-2xl'>{item.title}</h1>
                            <span className='h-[1px] w-full   bg-gradient-to-tr from-blue-300 to-blue-600  flex flex-row'></span></p>
                        <br />
                        <p className="text-gray-500 flex self-start">{item.desc} wegewge ebeberberbe ebrebebreb erbreberbreb egrebreberb brebre</p>



                        <div className="flex h-fit w-full justify-between  flex-wrap items-center">


                            <div className="flex self-end h-fit  rounded-lg justify-end mr-4 my-6 bg-gray-800">

                                <div className="p-2 flex flex-row">


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
                        {item.comments && item.comments.map((item: any) => (
                            <div className="flex justify-center items-center bg-white min-w-full max-h-20">
                                {item.email === user.email && (
                                    <CgMoreR onClick={() => handelMore(item._id)} />
                                )}
                                <div className="flex h-5 w-5">
                                    <img src={`https://avatars.dicebear.com/api/bottts/${item.name}.svg`} alt={item.name} className="object-contain flex w-full h-full" />
                                </div>
                                <p className="text-md">{item.comment}</p>
                            </div>
                        ))}
                        <form className="flex" onSubmit={(e) => handelSubmitComment(e)}>
                            <input
                                required
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                type='text' className='flex' />
                            <button type='submit' className='flex'>
                                submit
                            </button>
                        </form>
                    </div>
                </motion.div>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default ItemPage
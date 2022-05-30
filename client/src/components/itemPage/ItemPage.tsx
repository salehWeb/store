import { useEffect, useState } from 'react'
import { commentItem, sesrshQurey, likesProdectd, updataComment } from '../../server'
import { motion } from 'framer-motion';
import { Loader } from '../tools';
import Comments from './Comments';


const ItemPage = () => {
    const [item, setItem] = useState<any>()
    const [comment, setComment] = useState("")
    const [likesC, setLikes] = useState(false)
    const [isUpdata, setIsUpdata] = useState(false)
    const [data, setData] = useState<any>()
    const isHaveAcount = localStorage.getItem('profile')
    const user = isHaveAcount && JSON.parse(isHaveAcount).user


    const getItem = async () => {
        await sesrshQurey(window.location.search.split("=")[1]).then(async res => {
            setItem(res.data.data[0])
        }).catch((error: any) => console.log(error))
    }

    const handelCansel = () => {
        setComment("")
        setIsUpdata(false)
    }

    const handelSubmitComment = async (e: any) => {
        e.preventDefault()
        if (!isUpdata) {
            if (comment !== "") {
                const { email, name } = user
                const data = { comment: comment, user: { email, name } }
                console.log(data);
                await commentItem(item._id, data).then(res => {
                    getItem()
                    setComment("")
                }).catch(err => console.log(err))
            }
        } else {
            const { email, name } = user
            const id = data._id
            const endData = { comment, id, user: { email, name } }
            await updataComment(item._id, endData).then(res => {
                handelCansel()
            }).catch(err => console.log(err))
        }
    }





    useEffect(() => {
        getItem()
    }, [])



    const handelLikes = async () => {
        setLikes(!likesC)
        const { email, name } = user
        await likesProdectd(item._id, { email, name }).then(res => {
            res.data.likes.map((item: any) => {
                console.log(item)
                if (item.email === email) {
                    setLikes(true)
                } else {
                    setLikes(false)
                }
            })
        })
            .catch(error => console.log(error))
    }


    return (

        <div className='items-center grid grid-cols-1 justify-center w-full min-h-[60vh] rounded-lg bg-Blur px-8 py-4'>

            {item ? (
                <>
                    <motion.div
                        initial={{ x: 400, opacity: 0, scale: 0.2 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.8, x: 700, scale: 1 }}
                        key={item._id} className="w-full my-6 grid grid-cols-2 gap-10  ease-in-out duration-100 transition-all min-h-[50vh] rounded-lg">
                        <div className="flex  w-full flex-row flex-wrap justify-between rounded-lg h-full drop-shadow-lg">


                            <div className="w-full flex relative h-[50vh] rounded-lg  bg-white p-4 ">
                                <img className=' w-full  h-full object-contain' src={item.img} alt={item.title} />

                                <div className="bg-gray-800 shadow-lg   rounded-lg  -top-7 left-[30%] lg:w-[39%] px-[6px] h-10 items-center justify-center flex  absolute">
                                    <p className="text-gray-500">price $:{item.price}</p>
                                </div>
                            </div>
                        </div>


                        <div className=" w-full h-full flex flex-col justify-center items-center rounded-lg drop-shadow-lg bg-white p-4">
                            <h1 className='text-2xl flex  text-blue-600'>{item.title}
                                <span className='h-[1px] w-full  bg-gradient-to-tr from-blue-300 to-blue-600  flex '></span>
                            </h1>

                            <br />
                            <p className="text-gray-500 flex ">{item.desc} wegewge ebeberberbe ebrebebreb erbreberbreb egrebreberb brebre</p>




                            <div className="flex justify-center items-center mr-3 ">
                                <motion.button
                                    whileTap={{ scale: 0.6 }}
                                    onClick={handelLikes} className={` flex items-center ease-in-out duration-[50] transition-all justify-center w-9 h-9 rounded-md ${likesC ? 'text-red-600 shadow-md shadow-red-500 border-red-300' : 'text-slate-300 border-slate-200'} border `} type="button" aria-label="Like">
                                    <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                    </svg>
                                </motion.button>
                            </div>

                        </div>



                    </motion.div>

                    <motion.div
                        initial={{ x: 400, opacity: 0, scale: 0.2 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.8, x: 700, scale: 1 }}
                        className="w-full my-6 grid grid-cols-2 gap-6  ease-in-out duration-100 transition-all min-h-[50vh] rounded-lg">

                        <div className="flex justify-center items-center gap-6 flex-col h-auto w-full rounded-lg">
                        {item.comments && item.comments.map((items: any) => (
                            <Comments item={items} user={user} setData={setData} id={item._id} setIsUpdata={setIsUpdata} setComment={setComment}/> 
                        ))}

                        </div>

                        <div className="w-full flex h-[50vh] justify-center items-center rounded-lg drop-shadow-lg bg-white">
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

                                    <button
                                        type="submit"
                                        className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded drop-shadow-md
                                        hover:bg-white hover:text-blue-600 hover:rounded-3xl hover:border hover:border-blue-600 transition-all duration-[130ms] ease-in-out">
                                        {isUpdata ? "Updata" : "Comment"}
                                    </button>
                                    <button
                                        onClick={handelCansel}
                                        className="px-3 py-2 text-sm text-blue-600 border border-blue-500 drop-shadow-md 
                                        hover:bg-blue-600 hover:text-white hover:rounded-3xl transition-all duration-[130ms] ease-in-out">
                                        Cancel
                                    </button>
                                </div>

                            </form>
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
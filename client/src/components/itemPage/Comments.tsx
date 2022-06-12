import { FiDelete, FiMoreVertical } from 'react-icons/fi'
import moment from 'moment'
import { MdCreate } from 'react-icons/md';
import { useState } from 'react';
import { deleteComment } from '../../server/index'


const Comments = ({ item, setData, user, setIsUpdata, commentsData, setComment, setCommentsData, id, getItem }: any) => {
    const [isVasbl, setIsVasbl] = useState(false)



    const handelVasbel = async () => {
        setIsVasbl(!isVasbl)
        setData(item)
    }

    const handelDelete = async () => {
        console.log("handelDelete")
        setIsVasbl(false)
        const { email, name} = user
        const commentId = item._id
        const filterdComments = commentsData.filter((item: any) => item._id !== commentId)
        setCommentsData(filterdComments)
        await deleteComment(id, { id: commentId, user: { email, name } })
    }

    const handelUpdata = () => {
        setIsUpdata(true)
        setIsVasbl(false)
        setComment(item.comment)
    }

    return (
        <>
            <section key={item._id} className="justify-center w-full flex flex-col items-center rounded-lg drop-shadow-lg bg-white px-4 p-2">
                <div className="flex cursor-pointer relative w-full items-center">
                    {item.email === user?.email && (

                        <FiMoreVertical onClick={handelVasbel} />

                    )}
                    <p className="flex text-blue-600  items-center justify-center ml-2">
                        {item.name}
                    </p>
                    {isVasbl && (
                        <ul className="absolute flex justify-center items-center min-w-[120px] -bottom-[100px]  bg-gray-100 flex-col p-2 z-[5] drop-shadow-lg  rounded-lg">
                            <li onClick={handelDelete} className="flex flex-row justify-between w-full p-2 hover:bg-slate-200 rounded-lg items-center"><p>delete</p> <FiDelete /></li>
                            <li onClick={handelUpdata} className="flex flex-row justify-between w-full p-2 hover:bg-slate-200 rounded-lg items-center"><p>up data</p> <MdCreate /></li>
                        </ul>
                    )}
                </div>
                <hr className="flex w-full my-[3.5px]" />
                <main className='flex w-full rounded-lg flex-row justify-between items-center'>
                    <div className="flex h-9 w-9 rounded-lg justify-center items-center">
                        <img
                            src={`https://avatars.dicebear.com/api/bottts/${item.name}.svg`}
                            alt={item.name} className="object-contain rounded-lg drop-shadow-2xl flex w-full h-full" />
                    </div>
                    <em className='flex place-self-center items-center ml-2 text-sm w-full'>{moment(item.creatAt).fromNow()}</em>
                </main>
                <p className="text-lg p-1 flex place-self-center items-center ml-2 w-full">{item.comment}</p>
            </section>
        </>
    )
}

export default Comments
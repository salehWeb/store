import { useEffect, useState } from 'react'
import { getAllUSers } from '../../server/index'
import moment from 'moment'

const Users = () => {

    const [users, setUsers] = useState([])

const handelDelet = (id: any) => {
    console.log('user' + id);
}


    useEffect(() => {
        const Users = async () => {
            await getAllUSers().then(item => {
                setUsers(item.data)
            })
        }

        Users()

    }, [])


    return (
        <div className="min-h-[60vh] flex justify-center items-center">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:flex hidden">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="px-5 py-[10px]">
                                user name
                            </th>
                            <th scope="col" className="px-5 py-[10px]">
                                email
                            </th>
                            <th scope="col" className="px-5 py-[10px]">
                                join at
                            </th>
                            <th scope="col" className="px-5 py-[10px]">
                                <span className="sr-only">send messages</span>
                            </th>
                            <th scope="col" className="px-5 py-[10px]">
                                <span className="sr-only">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((item: any, index: number) => (
                            <tr key={item._id} className={`${Math.round(index / 2) === index / 2 ? 'bg-white hover:bg-gray-50' : 'bg-gray-100 hover:bg-white'} border-b`}>
                                <th scope="row" className="px-5 py-[10px] font-medium text-gray-900 whitespace-nowrap">
                                    {} 
                                </th>
                                <td className="px-5 py-[10px]">
                                    {item.email}
                                </td>
                                <td className="px-5 py-[10px]">
                                    {moment(item.createdAt).fromNow()}
                                </td>
                                <td className="px-5 py-[10px] text-right">
                                    <div className="font-medium cursor-pointer text-blue-600 hover:underline">Send Messages</div>
                                </td>
                                <td onClick={() => handelDelet(item._id)} className="px-5 py-[10px] text-right">
                                    <div className="font-medium cursor-pointer text-red-600 hover:underline">Delete</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users
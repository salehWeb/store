import { useEffect, useState } from 'react'
import { getAllUSers } from '../../../server/index'
import { Loader } from '../../tools'
import User from './User'

const Users = () => {

    const [users, setUsers] = useState([])

    const Users = async () => {
        await getAllUSers().then(item => {
            setUsers(item.data)
        })
    }

    useEffect(() => {
        Users()
    }, [])




    return (
        <div className="min-h-[60vh] flex justify-center items-center">
            {users.length > 0 ? (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex ">
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
                                    <span className="sr-only">Delete</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length >= 1 && users.map((item: any, index: number) => (
                                <User key={item._id} item={item} index={index} setUsers={setUsers} users={users} />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex items-center justify-center max-h-[30vh]">
                    <Loader />
                </div>
            )}

        </div>
    )
}

export default Users
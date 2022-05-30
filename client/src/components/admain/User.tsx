import moment from 'moment'
import Swal from 'sweetalert2'
import Loader from '../tools/Loader'
import { useState } from 'react'
import { deletUser } from '../../server/index'



const User = ({ item, index, setUsers, users }: any) => {

    const [isLoading, setIsLoading] = useState(false)

    const handelDelet = async (id: any) => {
        setIsLoading(true)
        await deletUser(id).then(async item => {
            await Swal.fire({
                icon: 'success',
                title: 'success',
                text: `${item.data.msg}`
            })
            setIsLoading(false)
            setUsers(users.filter((item: any) => item._id !== id))
        }).catch(async err => {
            await Swal.fire({
                icon: 'error',
                title: 'Filed',
                text: `${err.data.msg}`
            })
            setIsLoading(false)
            setUsers(users.filter((item: any) => item._id !== id))
        })
    }

    return (
        <tr key={item._id + index} className={`${Math.round(index / 2) === index / 2 ? 'bg-white hover:bg-gray-50' : 'bg-gray-100 hover:bg-white'} border-b`}>
            <th scope="row" className="px-5 py-[10px] font-medium text-gray-900 whitespace-nowrap">
                {item.name}
            </th>
            <td className="px-5 py-[10px]">
                {item.email}
            </td>
            <td className="px-5 py-[10px]">
                {moment(item.createdAt).fromNow()}
            </td>
            {isLoading ? (
                <td onClick={() => handelDelet(item._id)} className="px-5 py-[10px] text-right">
                    <Loader />
                </td>
            ) : (
                <td onClick={() => handelDelet(item._id)} className="px-5 py-[10px] text-right">
                    <div className="font-medium cursor-pointer text-red-600 hover:underline">Delete</div>
                </td>
            )}
        </tr>
    )
}

export default User
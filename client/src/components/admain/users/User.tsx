import moment from 'moment'
import Swal from 'sweetalert2'

import { useState } from 'react'
import { deletUser } from '../../../server/index'
import { FiDelete } from 'react-icons/fi'



const User = ({ item, index, setUsers, users }: any) => {

    const [isLoading, setIsLoading] = useState(false)

    const handelDelet = async (id: any) => {
        setIsLoading(true)

        Swal.fire({
            title: 'Do you want to delete user',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Delete',
        }).then(async (result) => {
            if (result.isConfirmed) {
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
            } else {
                setIsLoading(false)
                Swal.fire('Changes are not saved', '', 'info')
            }
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
                    <td onClick={() => handelDelet(item._id)} className=" px-5 py-[10px] text-lg text-right">
                    <FiDelete className="font-medium text-gray-600 hover:underline"></FiDelete>
                </td>
            ) : (
                <td onClick={() => handelDelet(item._id)} className=" px-5 py-[10px] text-lg text-right">
                    <FiDelete className="font-medium cursor-pointer text-red-600  hover:text-red-500"></FiDelete>
                </td>
            )}
        </tr>
    )
}

export default User
import { useState } from 'react'
import { deletItem } from '../../server/index'
import moment from 'moment'
import Swal from 'sweetalert2'
import { Loader } from '../tools'
import { Link } from 'react-router-dom'

const Item = ({ item, index, card, setCard }: any) => {
    const [isLoading, setIsLoading] = useState(false)

    
    const handelDelet = async (id: any) => {
        setIsLoading(true)
        await deletItem(id).then(async item => {
            await Swal.fire({
                icon: 'success',
                title: 'success',
                text: `${item.data.msg}`
            })
            setIsLoading(false)
            setCard(card.filter((item: any) => item._id !== id))
        }).catch(async err => {
            await Swal.fire({
                icon: 'error',
                title: 'Filed',
                text: `${err.data.msg}`
            })
            setIsLoading(false)
            setCard(card.filter((item: any) => item._id !== id))
        })
    }

    return (
        <tr key={item._id + index} className={`${Math.round(index / 2) === index / 2 ? 'bg-white hover:bg-gray-50' : 'bg-gray-100 hover:bg-white'} border-b`}>
            <th scope="row" className="px-5 py-[10px] font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {item.title}
            </th>
            <td className="px-5 py-[10px]">
                {item.type}
            </td>
            <td className="px-5 py-[10px]">
                {item.pieces}
            </td>
            <td className="px-5 py-[10px]">
                ${item.price}
            </td>
            <td className="px-5 py-[10px]">
                {moment(item.createdAt).fromNow()}
            </td>
            <td className="px-5 py-[10px]">
                {item.likes.length}
            </td>
            <td className="px-5 py-[10px] text-right">
                <Link to={`/adman/CreatItem?id=${item._id}`} className="font-medium cursor-pointer text-blue-600 hover:underline">Edit</Link>
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

export default Item
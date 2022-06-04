import React from 'react'
import{Link} from 'react-router-dom'

const ItemPay = ({item, index}: any) => {
    return (
        <tr key={item._id + index} className={`${Math.round(index / 2) === index / 2 ? 'bg-white hover:bg-gray-50' : 'bg-gray-100 hover:bg-white'} border-b`}>
            <td className="px-5 py-[10px]">
                <Link className=" hover:underline hover:text-blue-600 cursor-pointer " 
                to={`/item?id=${item._id}`}>{item.title}</Link>
            </td>
            <td className="px-5 py-[10px]">
                {item.q}
            </td>
            <td className="px-5 py-[10px]">
                ${item.price}
            </td>

            <td className="px-5 py-[10px]">
                {String(item.discount).split(".")[1]}0%
            </td>
        </tr>
    )
}

export default ItemPay
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Loader } from '../tools'

const Pay = ({ item, index }: any) => {
    const handelDelet = (id: any) => {
        console.log(id)
    }
    return (
        <tr key={item._id + index} className={`${Math.round(index / 2) === index / 2 ? 'bg-white hover:bg-gray-50' : 'bg-gray-100 hover:bg-white'} border-b`}>
            <th scope="row" className="px-5 py-[10px] font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {moment(item.sendAt).format('DD/MM/YYYY HH:mm')}
            </th>
            <td className="px-5 py-[10px]">
                {item.user.name}
            </td>
            <td className="px-5 py-[10px]">
                {item.user.email}
            </td>
            <td className="px-5 py-[10px]">
                ${item.total}
            </td>
            <td className="px-5 py-[10px]">
                <Link to={`/admin/payments/item?id=${item._id}`}>
                    <span className="hover:underline hover:text-blue-600 cursor-pointer">items</span>
                    </Link>
            </td>
            <td className="px-5 py-[10px] text-right">
                <div className="font-medium cursor-pointer text-blue-600 hover:underline">Send</div>
            </td>
            <td onClick={() => handelDelet(item._id)} className="px-5 py-[10px] text-right">
                <div className="font-medium cursor-pointer text-red-600 hover:underline">Cancel</div>
            </td>
        </tr>
    )
}

export default Pay
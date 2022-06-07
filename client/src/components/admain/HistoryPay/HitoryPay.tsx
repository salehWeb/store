import moment from 'moment'
import { Link } from 'react-router-dom'

const HitoryPay = ({ item, index }: any) => {
    return (
        <tr className={`${Math.round(index / 2) === index / 2 ? 'bg-white hover:bg-gray-50' : 'bg-gray-100 hover:bg-white'} border-b`}>
            <td className="px-5 py-[10px]">
                {item.isCancel ? 'Cancel' : 'Payment'}
            </td>
            
            <td className="px-5 py-[10px]">
                ${item.total.toFixed(2)}
            </td>
            
            <th scope="row" className="px-5 py-[10px] font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {moment(item.sendAt).format('DD/MM/YYYY HH:mm')}
            </th>
            
            <td className="px-5 py-[10px]">
                <Link to={`/admin/payments/item?id=${item._id}`}>
                    <span className="hover:underline hover:text-blue-600 cursor-pointer">items</span>
                </Link>
            </td>
            
            <td className="px-5 py-[10px]">
                {item.user.name}
            </td>
            
            <td className="px-5 py-[10px]">
                {item.user.email}
            </td>

        </tr>
    )
}

export default HitoryPay
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { canselePayment, senPayments } from '../../server'
import { Loader } from '../tools'
import Swal from "sweetalert2"

const Pay = ({ item, index, setPayments }: any) => {
    const [loadingCa, setLoadingCa] = useState(false)
    const [loadingSe, setLoadingSe] = useState(false)


    const handelCansel = async () => {
        setLoadingCa(true)
        await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.value) {

        await canselePayment(item._id).then(async res => {
            await Swal.fire({
                title: 'Success',
                text: 'Payment canseled',
                icon: 'success',
                confirmButtonText: 'OK'

            })
            setPayments((items: any) => items.filter((THISitem: any) => THISitem._id !== item._id))
            setLoadingCa(false)
        

        }).catch(err => console.log(err))
    }})
    setLoadingCa(false)
    }

    const handelSend = async () => {
        setLoadingSe(true)
        await senPayments(item._id, item.items).then(async (data: any) => {
            await Swal.fire({
                title: 'Success',
                text: 'Payment sent',
                icon: 'success',
                confirmButtonText: 'OK',
                showConfirmButton: true
            })
            console.log(data)
            setPayments((items: any) => items.filter((THISitem: any) => THISitem._id !== item._id))
            setLoadingSe(false)
        }).catch(err => console.log(err))
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
                ${item.total.toFixed(2)}
            </td>
            <td className="px-5 py-[10px]">
                <Link to={`/admin/payments/item?id=${item._id}`}>
                    <span className="hover:underline hover:text-blue-600 cursor-pointer">items</span>
                </Link>
            </td>

            {!loadingSe ? (
                <td className="px-5 py-[10px] text-right">
                    <div onClick={handelSend} className="font-medium cursor-pointer text-blue-600 hover:underline">Send</div>
                </td>
            ) : (
                <td className="px-5 py-[10px] text-right flex justify-center items-center">
                    <Loader />
                </td>
            )}

            {!loadingCa ? (
                <td onClick={handelCansel} className="px-5 py-[10px] text-right">
                    <div className="font-medium cursor-pointer text-blue-600 hover:underline">Cancel</div>
                </td>
            ) : (
                <td className="px-5 py-[10px] text-right flex justify-center items-center">
                    <Loader />
                </td>
            )}

        </tr>
    )
}

export default Pay
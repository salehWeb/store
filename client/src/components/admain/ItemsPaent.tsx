import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPaymentyId } from '../../server'
import { Loader } from '../tools'
import ItemPay from './ItemPay'

const ItemsPaent = () => {
    const history = useNavigate()
    const [payment, setPayments] = useState([])
    const id = window.location.search.split("=")[1]

    useEffect(() => {
        if (id) {
            const getPamenttFromServer = async () => {
                await getPaymentyId(id).then(res => {
                    console.log(res.data.items)
                    setPayments(res.data.items)
                }).catch(err => console.log(err))
            }
            getPamenttFromServer()
        } else {
            history("/adman/payments")
        }
    }, [])

    useEffect(() => {}, [payment]) 

    return (
        <div className="min-h-[60vh] flex justify-center items-center my-10">
            {payment.length > 0 ? (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                            <tr>
                                <th scope="col" className="px-5 py-[10px]">
                                    item name
                                </th>
                                <th scope="col" className="px-5 py-[10px]">
                                    quantity
                                </th>
                                <th scope="col" className="px-5 py-[10px]">
                                    price
                                </th>
                                <th scope="col" className="px-5 py-[10px]">
                                    discount
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {payment && payment.map((item: any, index: number) => (
                                <ItemPay item={item} key={item._id} index={index} />
                            ))}
                        </tbody>
                    </table>
                </div>

            ) : (
                <div className="text-center w-full flex justify-center items-center">
                    <Loader />
                </div>
            )}


        </div>
    )
}

export default ItemsPaent
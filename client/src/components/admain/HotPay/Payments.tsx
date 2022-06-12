import { useEffect, useState } from 'react'
import { getPaments } from '../../../server'
import { Loader } from '../../tools'
import Pay from './Pay'

const Payments = () => {
    const [payment, setPayments] = useState([])
    const [reqSuccses, setReqSuccses] = useState(false)

    useEffect(() => {
        const getPamenttFromServer = async () => {
            await getPaments().then(res => {
                setPayments(res.data)
                setReqSuccses(true)
            }).catch(err => console.log(err))
        }
        getPamenttFromServer()
    }, [])
    return (
        <div className="min-h-[60vh]  flex justify-center items-center my-10">
            {reqSuccses && payment.length > 0 && (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-100 uppercase bg-gray-700">
                            <tr>
                                <th scope="col" className="px-5 py-[10px]">
                                    sendAt
                                </th>
                                <th scope="col" className="px-5 py-[10px]">
                                    user name
                                </th>
                                <th scope="col" className="px-5 py-[10px]">
                                    User email
                                </th>
                                <th scope="col" className="px-5 py-[10px]">
                                    total
                                </th>

                                <th scope="col" className="px-5 py-[10px]">
                                    items
                                </th>

                                <th scope="col" className="px-5 py-[10px]">
                                    <span className="sr-only">Send</span>
                                </th>

                                <th scope="col" className="px-5 py-[10px]">
                                    <span className="sr-only">Cancel</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {payment && payment.map((item: any, index: number) => (
                                <Pay setPayments={setPayments} item={item} key={item._id} index={index} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {!reqSuccses && (
                <div className="text-center flex justify-center items-center">
                    <Loader />
                </div>
            )}
            {reqSuccses && payment.length === 0 && (
                <div className="text-center flex justify-center items-center w-full">
                    <h1 className="text-2xl">No Orders Found</h1>
                </div>
            )}

        </div>
    )
}

export default Payments
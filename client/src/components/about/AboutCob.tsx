import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as  actionTypes from '../../context/actionTypes'
import { getCard } from '../../server/index'
import moment from 'moment'

const AboutCob = () => {
  // const dispatch = useDispatch()
  const [card, setCard] = useState([])

  const getCards = async () => {
    await getCard().then(res => setCard(res.data))
  }

  useEffect(() => {
    getCards()
  }, [])


const handelEdait = (id: any) => {
  console.log('ubdata' + id)
}

const handelDelet = (id: any) => {
  console.log('delet' + id);
} 
  // const { cards } = useSelector((state: any) => state.card)

  // console.log(cards)


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-300 uppercase bg-gray-700">
          <tr>
            <th scope="col" className="px-5 py-[10px]">
              Product name
            </th>
            <th scope="col" className="px-5 py-[10px]">
              type
            </th>
            <th scope="col" className="px-5 py-[10px]">
              items
            </th>
            <th scope="col" className="px-5 py-[10px]">
              price
            </th>
            <th scope="col" className="px-5 py-[10px]">
              createdAt
            </th>

            <th scope="col" className="px-5 py-[10px]">
              Likes
            </th>

            <th scope="col" className="px-5 py-[10px]">
              <span className="sr-only">Edit</span>
            </th>
            <th scope="col" className="px-5 py-[10px]">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {card && card.map((item: any) => (
            <>
              <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                  <div onClick={() => handelEdait(item._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</div>
                </td>
                <td className="px-5 py-[10px] text-right">
                  <div onClick={() => handelDelet(item._id) } className="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</div>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AboutCob
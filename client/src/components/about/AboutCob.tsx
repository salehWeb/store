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



  // const { cards } = useSelector((state: any) => state.card)

  // console.log(cards)


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-2">
              Product name
            </th>
            <th scope="col" className="px-4 py-2">
              type
            </th>
            <th scope="col" className="px-4 py-2">
              pieces
            </th>
            <th scope="col" className="px-4 py-2">
              price
            </th>
            <th scope="col" className="px-4 py-2">
              createdAt
            </th>

            <th scope="col" className="px-4 py-2">
              Likes
            </th>

            <th scope="col" className="px-4 py-2">
              <span className="sr-only">Edit</span>
            </th>
            <th scope="col" className="px-4 py-2">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {card && card.map((item: any) => (
            <>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-4 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {item.title}
                </th>
                <td className="px-4 py-2">
                  {item.type}
                </td>
                <td className="px-4 py-2">
                  {item.pieces}
                </td>
                <td className="px-4 py-2">
                  {item.price}
                </td>
                <td className="px-4 py-2">
                  {moment(item.createdAt).fromNow()}
                </td>
                <td className="px-4 py-2">
                  {item.likes.length}
                </td>
                <td className="px-4 py-2 text-right">
                  <a href={`/adman?id=${item._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
                <td className="px-4 py-2 text-right">
                  <a href={`/adman?id=${item._id}`} className="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</a>
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
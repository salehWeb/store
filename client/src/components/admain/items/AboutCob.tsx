import { useEffect, useState } from 'react'
import { getCard } from '../../../server/index'
import { Loader } from '../../tools'
import Item from './Item'

const AboutCob = () => {
  const [card, setCard] = useState([])


  const getCards = async () => {
    await getCard().then(res => setCard(res.data))
  }

  useEffect(() => {
    getCards()
  }, [])



  return (
    <div className="min-h-[60vh]  flex justify-center items-center my-10">
      {card.length > 0 ? (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-100 uppercase bg-gray-700">
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
              discount
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
          {card && card.map((item: any, index: number) => (
            <Item item={item} key={item._id} index={index} card={card} setCard={setCard}/>
          ))}
        </tbody>
      </table>
    </div>
      ) : (
        <div className="flex max-h-[30vh] items-center justify-center">
          <Loader />
        </div>
      )}

    </div>
  )
}

export default AboutCob
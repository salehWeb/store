import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IoFastFood } from 'react-icons/io5'
import RowCon from '../row/RowCon';
import { getLovedItem, sesrshQurey } from '../../server';
import { Loader } from '../tools';




const CardCon = ({ data }: any) => {
  const [filter, setFilter] = useState("");
  const [loved, setLoved] = useState([])
  const [FilterdData, setFilterdata] = useState([])
  const [LoadingFilter, setLoadingFilter] = useState(false)

  useEffect(() => {
    const getMostLOvedItems = async () => {
      await getLovedItem().then((res) => {
        setLoved(res.data)
      }
      ).catch((error: any) => console.log(error))
    }
    getMostLOvedItems()
  }, [])

  useEffect(() => {
  }, [data])
  useEffect(() => {
    if (filter) {
      setLoadingFilter(true)
      const HandelGetFilterdData = async () => {
        await sesrshQurey(filter).then((res) => {
          setFilterdata(res.data.data)
          setLoadingFilter(false)
        }
        ).catch((error: any) => {
          setLoadingFilter(false)
          console.log(error)
        })

      }
      HandelGetFilterdData()
    }

  }, [filter])



  const types = ['drink', 'meat', 'pasta', 'salad', 'soup', 'vegetable', 'chicken', 'purger', 'Pizza', 'Other']



  return (

    <section className="w-full my-6" id="menu">
      <div
        className="w-full flex flex-col items-center justify-center">

        {loved.length >= 1 ? (
          <RowCon loved={true} flag={true} data={loved} />
        ) : (
          <div className="flex justify-center items-center w-full max-h-[30vh]">
            <Loader />
          </div>
        )}

        <p className="text-2xl mt-40 font-semibold mb-4 capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-blue-400 to-blue-600 mr-auto">
          Products types
        </p>
        <div className="w-full flex items-center flex-wrap justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">

          {
            types.map((type: any) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={type}
                className={`group ${filter === type ? "bg-blue-600" : "bg-Blur"
                  } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-blue-600 `}
                onClick={() => setFilter(type)}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${filter === type
                    ? "bg-white"
                    : "bg-blue-600"
                    } group-hover:bg-white flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${filter === type
                      ? "text-gray-500"
                      : "text-white"
                      } group-hover:text-gray-500 text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${filter === type
                    ? "text-white"
                    : "text-gray-500"
                    } group-hover:text-white`}
                >
                  {type}
                </p>
              </motion.div>
            ))}
        </div>
        {FilterdData.length >= 1 && (
          <div className="w-full">
            <RowCon
              flag={false}
              data={FilterdData}
            />
          </div>
        )}
        {!LoadingFilter && FilterdData.length === 0 && filter && (
          <div className="w-full flex items-center justify-center">
            <p className="text-2xl  font-semibold my-6 capitalize  text-gray-700">
              No results found
            </p>
          </div>
        )}
        {LoadingFilter && (
          <div className="w-full flex justify-center items-center">
            <Loader />
          </div>
        )}
      </div>
    </section>
  )
}

export default CardCon
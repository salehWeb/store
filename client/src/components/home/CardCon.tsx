import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IoFastFood } from 'react-icons/io5'
import RowCon from '../row/RowCon';
import { getLovedItem } from '../../server';




const CardCon = ({ data, slide }: any) => {

  let result: any = []

  const [filter, setFilter] = useState("");
  const [res, SetRes] = useState(result)
  const [loved, setLoved] = useState([])

  useEffect(() => {
    const getMostLOvedItems = async () => {
      await getLovedItem().then((res) => {
        setLoved(res.data)
        console.log(loved);
      }
      ).catch((error: any) => console.log(error))
    }
    getMostLOvedItems()
  }, [])

  useEffect(() => {
  }, [data])

  useEffect(() => {
    if (data) {
      const handel = async () => {
        for (let i: any = 0; i < data?.length; i++) {
          if (result.indexOf(data[i].type) === -1) {

            result.push(data[i].type)

          }
        }
        SetRes(result)
      }

      handel()
    }
  }, [data, result])




  return (

    <section className="w-full my-6" id="menu">
      <div
        className="w-full flex flex-col items-center justify-center">

        {loved && loved.length >= 1 && (
          <RowCon loved={true} flag={true} slide={slide} data={loved} />
        )}

        <p className="text-2xl mt-10 font-semibold mb-4 capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-blue-400 to-blue-600 mr-auto">
          Products types
        </p>
        <div className="w-full flex items-center flex-wrap justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">

          {
            res.map((type: any) => (
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
        <div className="w-full">
          <RowCon
            flag={false}
            data={data?.filter((item: any) => item.type === filter)}
          />
        </div>
      </div>
    </section>
  )
}

export default CardCon
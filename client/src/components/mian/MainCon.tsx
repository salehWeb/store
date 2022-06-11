import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { RowCon, CardCon, Loader } from '../tools/index'
import { useEffect, useState, useTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sesrshQurey } from '../../server'
import { useNavigate } from 'react-router-dom'
import * as actionTypes from '../../context/actionTypes'


const MainCon = () => {
  const { search } = useSelector((state: any) => state.card)
  const { isSearching } = useSelector((state: any) => state.card)
  const history = useNavigate()
  const dispatch: any = useDispatch()
  const [flag, setFlag] = useState(true)
  const [serchVul, setSerch] = useState<any>(null)
  const [serch, setSershLoaction] = useState('')
  const [startTransition, isPending] = useTransition()



  useEffect(() => {
    setSershLoaction(window.location.search.split('=')[1])
    isPending(() => {
      const getSerch = async () => {
        if (!search && serch) {
          const { data } = await sesrshQurey(serch.split(' ').join(''))
          dispatch({ type: actionTypes.GET_SEARCH, payload: data.data })
          setSerch(data.data)
        } else {
          setSerch(search)
        }
      }
      getSerch()
    })
  }, [dispatch, search, serch, isSearching])


  const handelRestSearch = () => {
    dispatch({ type: actionTypes.REST_SAERCH })
    setSerch(null)
    history("/")
  }

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0}}
        transition={{ duration: 0.5 }}
        className='w-full'>

        {serch ? (
          <>
            <div className='w-full flex justify-end fixed left-[-21px] z-[5] items-center'>
              <div onClick={handelRestSearch} className="hover:rounded-2xl cursor-pointer rounded-lg ease-in-out duration-75 p-2 transition-all items-center justify-center text-xl text-center shadow-lg hover:bg-blue-200 hover:drop-shadow-lg bg-Blur  flex">
                Rest Search
              </div>
            </div>
            {startTransition ? (
              <div className='flex justify-center items-center w-full min-h-[50vh]'>
                <Loader />
              </div>
            ) : (
              serchVul?.length >= 1 ? (
                <RowCon data={serchVul} flag={!flag} />
              ) : (
                <div className="flex justify-center items-center w-full min-h-[50vh]">
                  <div className="flex items-center text-center text-2xl">
                    No result found
                  </div>
                </div>
              )
            )}

          </>
        ) : (
          <>
            <div className="w-full items-center justify-center mt-6">
              <p className="text-2xl font-semibold mb-4 capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-blue-400 to-blue-600 mr-auto">
                Our Loved products
              </p>
            </div>
            <CardCon />
          </>
        )}

      </motion.section>
    </div>
  )
}

export default MainCon
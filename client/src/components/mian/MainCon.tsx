import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { RowCon, CardCon } from '../tools/index'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCard } from '../../context/Cardactions'
import { sesrshQurey } from '../../server'
import { useNavigate } from 'react-router-dom'


const MainCon = () => {
  const history = useNavigate()
  const dispatch: any = useDispatch()
  const [flag, setFlag] = useState(true)
  const [slide, setSlide] = useState(0)
  const { data }: any = useSelector((state: any) => state.card)
  const [serchVul, setSerch] = useState<any>(null)
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    dispatch(getCard())
  }, [dispatch])


  useEffect(() => {

  }, [slide])


  const nextSlid = () => {
    console.log(slide)
    if (data) {
      setSlide(slide === 2 - 1 ? 0 : slide + 1)
    }
  }

  useEffect(() => {
    const getSerch = async () => {
      if (!serchVul && window.location.search.split('=')[1]) {
        const serch = window.location.search.split('=')[1]
        const data: any = await sesrshQurey(serch)
        setSerch(data.data.data)
      }
      setRerender(true)
      console.log(serchVul);
    }
    getSerch()
  }, [serchVul])

  const prefseSlide = () => {
    console.log(slide)
    if (data) {
      setSlide(slide === 0 ? 2 - 1 : slide - 1)
    }
  }

  const handelRestSearch = () => {
    setSerch(null)
    history("/")
  }

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <section className='w-full'>
        <div className='w-full flex justify-end items-center'>
          <div onClick={handelRestSearch} className="hover:rounded-2xl cursor-pointer rounded-lg ease-in-out duration-75 p-2 transition-all items-center justify-center text-xl text-center shadow-lg hover:bg-blue-200 hover:drop-shadow-lg bg-Blur  flex">
            Rest Search
          </div>
        </div>
        {serchVul && serchVul.length >= 1 ? (
          <RowCon slide={slide} data={serchVul} flag={!flag} />
        ) : (
          <>
            <div className="w-full items-center justify-center mt-6">
              <p className="text-2xl font-semibold mb-4 capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-blue-400 to-blue-600 mr-auto">
                Our Loved products
              </p>
              <div className="flex items-center justify-between w-full -mb-4">

                <motion.div onClick={prefseSlide} whileTap={{ scale: 0.6 }} className="w-8 bg-blue-400   hover:bg-blue-600 cursor-pointer  rounded-lg h-8 flex items-center justify-center"><MdChevronLeft className='text-lg text-white' /></motion.div>
                <motion.div onClick={nextSlid} whileTap={{ scale: 0.6 }} className="w-8 bg-blue-400   hover:bg-blue-600 cursor-pointer  rounded-lg h-8 flex items-center justify-center"><MdChevronRight className='text-lg text-white' /></motion.div>
              </div>
            </div>
            <CardCon data={data} slide={slide} />
            <RowCon slide={slide} data={data} flag={!flag} />
          </>
        )}

      </section>
    </div>
  )
}

export default MainCon
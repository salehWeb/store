import img from '../img/delivery.png'

import { Home } from './index'
import {motion} from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import {RowCon, CardCon } from './index'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCard } from '../context/actions'


const MainCon = () => {
  const dispatch: any = useDispatch()
  const [flag, setFlag] = useState(true)
  const [slide, setSlide] = useState(0)
  const { data }: any = useSelector((state: any) => state.card)

  useEffect(() => {
    dispatch(getCard())
  }, [dispatch])
  
    useEffect(() => {

    }, [slide])

  const cardLingth =  data?.length 
  

  const nextSlid = () => {
    if (data) {
        setSlide(slide === cardLingth - 1 ? 0 : slide + 1)
    }
}

const prefseSlide = () => {
    if (data) {
        setSlide(slide === 0 ? cardLingth - 1 : slide - 1)
    }
}


  
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <Home />
      <section className='w-full'>
        <div className="w-full items-center justify-center my-6">
          <p className="text-lg font-semibold transition-all 
          ease-in-out duration-100 uppercase after:absolute 
          after:content after:flex after:w-28 after:h-1 after:bottom-0
          after:left-0 after:bg-blue-600 relative">
            Lorem ipsum & sit amet
          </p>
          <div className="hidden md:flex gap-3 items-center ">
            <motion.div onClick={prefseSlide} whileTap={{ scale: 0.6 }} className="w-8 bg-blue-400   hover:bg-blue-600 cursor-pointer  rounded-lg h-8 flex items-center justify-center"><MdChevronLeft className='text-lg text-white'/></motion.div>
            <motion.div onClick={nextSlid} whileTap={{ scale: 0.6 }} className="w-8 bg-blue-400   hover:bg-blue-600 cursor-pointer  rounded-lg h-8 flex items-center justify-center"><MdChevronRight className='text-lg text-white'/></motion.div>
          </div>  
        </div>
        {/* <RowCon slide={slide} data={data} flag={flag}/> */}
        <CardCon data={data} />
      </section>
    </div>
  )
}

export default MainCon
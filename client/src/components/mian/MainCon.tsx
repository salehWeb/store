import {motion} from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import {RowCon, CardCon } from '../tools/index'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCard } from '../../context/Cardactions'


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
      <section className='w-full'>
        <div className="w-full items-center justify-center my-6">
          <div className="flex gap-3 items-center ">
            <motion.div onClick={prefseSlide} whileTap={{ scale: 0.6 }} className="w-8 bg-blue-400   hover:bg-blue-600 cursor-pointer  rounded-lg h-8 flex items-center justify-center"><MdChevronLeft className='text-lg text-white'/></motion.div>
            <motion.div onClick={nextSlid} whileTap={{ scale: 0.6 }} className="w-8 bg-blue-400   hover:bg-blue-600 cursor-pointer  rounded-lg h-8 flex items-center justify-center"><MdChevronRight className='text-lg text-white'/></motion.div>
          </div>  
        </div>
        <CardCon data={data} />
        <RowCon slide={slide} data={data} flag={!flag}/>
      </section>
    </div>
  )
}

export default MainCon
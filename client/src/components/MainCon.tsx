import img from '../img/delivery.png'

import { Home } from './index'
import {motion} from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import {RowCon } from './index'
import { useState } from 'react'


const MainCon = () => {
  const [flag, setFlag] = useState(true)
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
            <motion.div whileTap={{ scale: 0.6 }} className="w-8 bg-blue-400   hover:bg-blue-600 cursor-pointer transition-all duration-100 ease-in-out rounded-lg h-8 flex items-center justify-center"><MdChevronLeft className='text-lg text-white'/></motion.div>
            <motion.div whileTap={{ scale: 0.6 }} className="w-8 bg-blue-400   hover:bg-blue-600 cursor-pointer transition-all duration-100 ease-in-out rounded-lg h-8 flex items-center justify-center"><MdChevronRight className='text-lg text-white'/></motion.div>
          </div>  
        </div>
        <RowCon flag={flag}/>
      </section>
    </div>
  )
}

export default MainCon
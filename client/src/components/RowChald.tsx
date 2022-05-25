import React, { useEffect, useState } from 'react'
import { getImage } from '../server'
import Loader from './Loader'

const RowChald = ({ cardRef, item, items, MdShoppingCart, cards, MdAddTask, handelAdd, motion }: any) => {

    const [image, setImage] = useState('')

    const IMAGE = async () => {
        await getImage(item._id).then((data: any) => {
            setImage(data)
        })
    }

    useEffect(() => { localStorage.setItem(`cardItems`, JSON.stringify(items)) }, [items])

    useEffect(() => { 
        if (!image) {
            IMAGE()
        }
     }, [])

     const [open, setOpen] = useState(false)

    return (
        
        <div ref={cardRef} key={item._id} className="bg-Blur w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px] rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative">
                        <div onClick={() => setOpen(!open)} className="block w-5 left-1/2 top-1/2  z-[2] ">
                            <span aria-hidden="true" className={`${open && ' -rotate-[45deg] translate-y-1.5 '} block h-0.5 w-5 mb-[4px] bg-current transform transition duration-400 ease-in-out`}></span>
                            <span aria-hidden="true" className={`block  h-0.5 w-5 bg-current transform transition duration-400 ease-in-out ${open && 'opacity-0'} `}></span>
                            <span aria-hidden="true" className={`${open && ' rotate-[45deg] -translate-y-1.5 '} block h-0.5 w-5 mt-[4px] bg-current transform transition duration-400 ease-in-out`}></span>
                        </div>

            <div className="w-full flex items-center justify-between">
                {!image ? (
                    <div className="flex  justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                        <motion.div whileHover={{ scale: 1.15 }} className='w-40 h-40 -mt-8 drop-shadow-2xl'>
                            <img src={image} alt={item.title} className='w-full h-full object-contain' />
                        </motion.div>
                    )}
                <>
                    {items && items.find((id: any) => id._id === item._id) ?
                        (
                            <motion.div whileTap={{ scale: 0.6, options: 0.6 }} className="w-8 h-8 rounded-full  bg-gradient-to-tr from-blue-300 to-blue-600   flex items-center justify-center cursor-pointer hover:shadow-md -mt-8">
                                <MdAddTask className='text-white' />
                            </motion.div>
                        ) : (
                            <motion.div whileTap={{ scale: 0.6, options: 0.6 }} className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-300 to-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8">
                                <MdShoppingCart onClick={() => handelAdd(item)} className='text-white' />
                            </motion.div>
                        )}
                </>
            </div>
            <div className="w-full flex flex-col items-end justify-end -mt-8">
                <p className="text-gray-700 md:text-lg text-semibold text-base">{item.title}</p>
                <div className="flex items-center gap-8">
                    <p className='text-lg text-gray-700 font-semibold'>
                        <span className='text-sm text-blue-600'>$</span>{item.price}
                    </p>
                </div>
            </div>
        </div >
    )
}

export default RowChald
import {  useEffect } from 'react'
import Loader from '../tools/Loader'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getItemPageData } from '../../context/Cardactions';

const RowChald = ({ item, items, MdShoppingCart, MdAddTask, handelAdd, motion }: any) => {
    const history = useNavigate()
    const dispatch: any = useDispatch()

    useEffect(() => { localStorage.setItem(`cardItems`, JSON.stringify(items)) }, [items])


    const handelItemModel = () => {
        dispatch(getItemPageData(item, history))
    }

    return (

        <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.8 }}
        key={item._id}
        className={`bg-Blur h-[270px]  min-w-[180px] md:min-w-[220px] flex flex-col   rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg shadow-xl relative`}>
            <div className="w-full flex flex-col items-center justify-between -p-2">
                <div className="w-full flex justify-between items-center mb-16">
                    {item.discount !== 0 ?
                        (
                            <>
                                <p className="text-gray-100 md:text-lg p-1 rounded-full drop-shadow-lg bg-red-600  flex justify-between text-semibold text-base">{String(item.discount).split(".")[1]}0%</p>

                                <div className="flex justify-between items-center gap-8 flex-col">
                                    <p className='text-lg text-gray-700 font-semibold flex-row flex'>
                                        <span className='text-sm text-blue-600'>$</span>
                                        <span className="line-through mr-2">
                                            {item.price}
                                        </span>
                                        <span className='text-sm text-blue-600'>$</span>
                                        {Number(item.price - (item.price * item.discount)).toFixed(2)}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-between items-center gap-8">
                                <p className='text-lg text-gray-700 font-semibold flex-row flex'>
                                    <span className='text-sm text-blue-600'>$</span>{item.price}
                                </p>
                            </div>
                        )}

                </div>

                    <motion.div onClick={handelItemModel} whileHover={{ scale: 1.15 }} className='w-40 h-40 -mt-8 drop-shadow-2xl flex cursor-pointer'>
                        <img src={item.img} alt={item.title} className='w-full h-full object-contain cursor-pointer' />
                    </motion.div>

            </div>
            <div className="w-full flex flex-wrap items-center justify-between ">
                {items && items.find((id: any) => id._id === item._id) ?
                    (
                        <motion.div whileTap={{ scale: 0.6 }} className="w-8 h-8 rounded-full  bg-gradient-to-tr from-blue-300 to-blue-600   flex items-center justify-center cursor-pointer hover:shadow-md ">
                            <MdAddTask className='text-white' />
                        </motion.div>
                    ) : (
                        <motion.div whileTap={{ scale: 0.6 }} className="w-8 h-8  duration-75 rounded-full bg-gradient-to-tr  from-red-300 to-red-600 flex items-center justify-center cursor-pointer hover:shadow-md ">
                            <MdShoppingCart  onClick={() => handelAdd(item)} className='text-white' />
                        </motion.div>
                    )}
                <p className="text-gray-700 md:text-lg flex justify-between text-semibold text-base">{item.title}</p>
            </div>
        </motion.div >
    )
}

export default RowChald
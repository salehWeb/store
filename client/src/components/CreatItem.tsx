import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney, MdClose } from 'react-icons/md'
import Loader from './Loader'
import FileBase from './Input.js'
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../context/actionTypes'
import { postCard, getCard } from '../context/actions';

const CreatItem = () => {
  const dispatch: any = useDispatch()

  const defaulValue: any = {
    title: '', pieces: '', price: '', type: '',
    img: '', alert: 'none', msg: '', desc: ''
  }
  const data = useSelector((state: any) => state.card)
  const [isDate, setIsData] = useState(data.data)
  const [isMsg, setIsMsg] = useState(data.msg)

  useEffect(() => {
    dispatch(getCard())
    setIsData(data.data)
    setIsMsg({ ...data!.msg })
  }, [])


  const [allState, setAllState] = useState(defaulValue)
  const [isOpen, setIsOpen] = useState(true)
  const [isAllStateGood, setIsAllStateGood] = useState(false)
  const [isVauleNUmber, seeetIsVauleNumber] = useState(false)



  const handelCansel = () => {
    setAllState(defaulValue)
  }

  const handelClose = () => {
    setIsOpen(false)
    console.log('hello i must close')
  }

  const handelDeletImage = () => {
    setAllState({ ...allState, img: '' })
  }

  const handelSaveData = () => {
    if (!Number(allState.price) && allState.price) {
      setIsOpen(true)
      setAllState({ ...allState, msg: `price must to be number not "${allState.price}"` })
    }
    else if (!Number(allState.pieces) && allState.pieces) {
      setIsOpen(true)
      setAllState({ ...allState, msg: `pieces must to be number not  "${allState.pieces}"` })
    }
    else if ( allState.title && allState.desc && allState.img && allState.type) {
      setAllState({ ...allState, msg: `loading...` })
      dispatch(postCard(allState))
      const res = async () => {
        let masge = await isMsg.msg
        if (masge === 'Created') {
          return masge
        }
      } 
      setAllState({ ...allState, msg: res()})
      setIsOpen(true)
      if (isMsg.msg === 'Created') {
        setIsOpen(true)
        setTimeout(() => {
          setAllState(defaulValue)
          setIsMsg('')
        }, 3000)
      }
    }
    else {
      setIsOpen(true)
      setAllState({ ...allState, msg: 'you measd some thank all the Fields is required'})
    }
  }



  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[50%] bg-slate-50 border border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        <AnimatePresence >
          {isOpen && allState.msg && (
            <motion.div
              initial={{ x: 400, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ opacity: 0.8, x: -700, scale: 1 }}
              transition={{ duration: 5, type: 'spring', damping: 175, stiffness: 900 }}
              className={` w-full  p-2 rounded-lg relative flex text-center text-lg items-center justify-between font-semibold ${allState.alert === "danger"
                ? "bg-red-400"
                : "bg-emerald-400"
                }`}
            >
              <p className='px-4'>{allState?.msg}</p> <MdClose onClick={handelClose} className={`cursor-pointer absolute top-0 shadow-lg m-2 ${allState.alert === "danger" ? 'bg-gray-400' : 'bg-red-400'} rounded-lg right-0 block`} />
            </motion.div>
          )}
        </AnimatePresence>


        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required={true}
            value={allState.title}
            onChange={(e) => setAllState({ ...allState, title: e.target.value })}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-gray-600"
          />
        </div>

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required={true}
            value={allState.type}
            onChange={(e) => setAllState({ ...allState, type: e.target.value })}
            placeholder="type"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-gray-600"
          />
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
          {allState.isLoading ? (
            <Loader />
          ) : (
            <>
              {!allState.img ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className=" text-gray-500 text-[6rem] hover:text-gray-700" />
                      <p className="text-gray-500 my-1 hover:text-gray-700">
                        Click here to upload 
                      </p>
                    </div>
                    <span className='grid w-0 h-0 items-center justify-center bg-red-400'>
                      <FileBase   required={true} className='w-0 h-0 block text-red-600' type='file' multiple={false} onDone={({ base64 }: any) => setAllState({ ...allState, img: base64 })} />
                    </span>
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={allState.img}
                      alt="uploaded"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={handelDeletImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required={true}
              value={allState.pieces}
              onChange={(e) => setAllState({ ...allState, pieces: e.target.value })}
              placeholder="pieces"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-gray-600"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required={true}
              value={allState.price}
              onChange={(e) => setAllState({ ...allState, price: e.target.value })}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-gray-600"
            />
          </div>
        </div>

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required={true}
            value={allState.desc}
            onChange={(e) => setAllState({ ...allState, desc: e.target.value })}
            placeholder="desc"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-gray-600"
          />
        </div>

        <div className="flex items-center justify-between w-full">
          <button
            type="button"
            className="ml-0  w-24   border-none outline-none bg-emerald-500 px-2 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={handelSaveData}
          >
            Save
          </button>
          <button
            type="button"
            className="ml-0  w-24  border-none outline-none bg-red-500 px-2 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={handelCansel}
          >
            Cansel
          </button>
          
        </div>
      </div>
      
    </div>
  )
}

export default CreatItem

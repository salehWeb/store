import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney, MdClose } from 'react-icons/md'
import Loader from '../tools/Loader'
import FileBase from '../tools/Input.js'
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../../context/actionTypes'
import { postCard } from '../../context/Cardactions';
import { sesrshQurey } from '../../server/index';



const CreatItem = () => {
  let data: any = useSelector((state: any) => state.card)


  const dispatch: any = useDispatch()

  const defaulValue: any = {
    title: '', pieces: '', price: '', type: '',
    img: '', alert: 'none', msg: '', desc: ''
  }


  const [isMsg, setIsMsg] = useState(data?.msg)
  const [allState, setAllState] = useState(defaulValue)
  const [lodaing, setLoading] = useState(true)

  useEffect(() => {
    if (window.location.search.split("=")[1] && window.location.search.split("=")[1].length >= 24) {
      setLoading(true)
      const id = window.location.search.split("=")[1]
      async function fetchData() {
        await sesrshQurey(id).then(res => {
          console.log(res.data.data[0]._id === id);
          if (res.data.data[0]._id === id) {
            setAllState(res.data.data[0])
            setLoading(false)
          }
        })
      }

      fetchData()
    }

  }, [])

  useEffect(() => {
    setIsMsg(data?.msg)
    if (isMsg?.msg) {
      setAllState({ ...allState, msg: isMsg?.msg })
    }
  }, [dispatch, data, isMsg?.msg, allState])





  const [isOpen, setIsOpen] = useState(true)



  const handelCansel = () => {
    setAllState(defaulValue)
  }

  const handelClose = () => {
    setIsOpen(false)
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
      setAllState({ ...allState, msg: `pieces must to be number not "${allState.pieces}"` })
    }

    else if (allState.title && allState.desc && allState.img && allState.type && Number(allState.price) && Number(allState.pieces)) {
      if (window.location.search.split("=")[1].length >= 24) {
        console.log("ubdataaaaet data");
      } else {
        dispatch(postCard(allState))
      }
      setIsOpen(true)
      setTimeout(async () => {
        await dispatch({ type: actionTypes.POSTCARD, payload: null })
        setAllState(defaulValue)
        setIsOpen(false)
      }, 5000)
    }

    else {
      setIsOpen(true)
      setAllState({ ...allState, msg: 'you measd some thank all the Fields is required' })
    }
  }





  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[50%] bg-slate-50 border border-gray-700 rounded-lg p-4 mx-24 flex flex-col items-center justify-center gap-4">
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


        <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 mx-[200px] w-full h-[225px] md:h-[300px] cursor-pointer">
          <>
            {lodaing ? (
              <Loader />
            ) : (
              !allState.img ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className=" text-gray-500 text-[6rem] hover:text-gray-700" />
                      <p className="text-gray-500 my-1 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <span className='grid w-0 h-0 items-center justify-center bg-red-400'>
                      <FileBase required={true} className='w-0 h-0 block text-red-600' type='file' multiple={false} onDone={({ base64 }: any) => setAllState({ ...allState, img: base64 })} />
                    </span>
                  </label>
                </>
              ) : (
                <>
                  <div className="w-full h-full relative">
                    <img
                      src={allState.img}
                      alt="uploaded"
                      className="w-full h-full object-contain"
                    />
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.6 }}
                      className="absolute bottom-2 right-2 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-lg  duration-500 transition-all ease-in-out"
                      onClick={handelDeletImage}
                    >
                      <MdDelete className="text-white" />
                    </motion.button>
                  </div>
                </>
              )
            )}

          </>
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
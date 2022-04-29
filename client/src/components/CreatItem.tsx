import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney, MdClose } from 'react-icons/md'
import Loader from './Loader'

const CreatItem = () => {
  const defaulValue: any = {
    title: '', colors: '', price: '',
    category: null, img: null, fields: true, alert: 'none',
    msg: null, isLoading: false
  }
  const [allState, setAllState] = useState(defaulValue)
  const [isOpen, setIsOpen] = useState(true)

  const handelClose = () => {
    setIsOpen(false)
    console.log('hello i must close')
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[50%] bg-slate-50 border border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        <AnimatePresence > 
        {isOpen && (
            <motion.div
              initial={{ x: 400, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ opacity: 0.8, x: -700, scale: 1}}
              transition={{ duration: 5, type: 'spring', damping: 175, stiffness: 900 }}
              className={` w-full  p-2 rounded-lg relative flex text-center text-lg items-center justify-between font-semibold ${allState.alert === "danger"
                ? "bg-red-400"
                : "bg-emerald-400"
                }`}
            >
              <p className='px-4'>{allState.msg} ewfeeeef ewfeeeef afsfesf wefihe ewfeeeef  afsfesf wefihe afsfesf wefihe hello world</p> <MdClose onClick={handelClose} className={`cursor-pointer absolute top-0 shadow-lg m-2 ${allState.alert === "danger" ? 'bg-gray-400' : 'bg-red-400'} rounded-lg right-0 block`} />
            </motion.div>
        )}
        </AnimatePresence>



        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={allState.title}
            onChange={(e) => setAllState({ ...allState, title: e.target.value })}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setAllState({ ...allState, category: e.target.value })}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {allState.category &&
              allState.category.map((item: any) => (
                <option
                  key={item?.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item?.urlParamName}
                >
                  {item?.name}
                </option>
              ))}
          </select>
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
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={(uploadImage) => { }}
                      className="w-0 h-0"
                    />
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
                      onClick={(deleteImage) => { }}
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
              required
              value={allState.colors}
              onChange={(e) => setAllState({ ...allState, colors: e.target.value })}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={allState.price}
              onChange={(e) => setAllState({ ...allState, price: e.target.value })}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={(saveDetails) => { }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatItem
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md'
import Loader from '../tools/Loader'
import { postCard } from '../../server/index'
import { sesrshQurey, upDataCard } from '../../server/index';
import Swal from 'sweetalert2'



const CreatItem = () => {

  const defaulValue: any = {
    title: '', pieces: '', price: '', type: 'Other',
    img: '', desc: '', discount: '0',
  }


  const [allState, setAllState] = useState(defaulValue)
  const [isLoading, setLoading] = useState(false)
  const [isLoadingBtn, setLoadingBtn] = useState(false)
  const [isUpData, setIsUpData] = useState(false)

  useEffect(() => {
    if (window.location.search.split("=")[1] && window.location.search.split("=")[1].length >= 24) {
      setLoading(true)
      const id: any = window.location.search.split("=")[1]
      async function fetchData() {
        await sesrshQurey(id).then(res => {
          console.log(res.data.data[0]._id === id);
          if (res.data.data[0]._id === id) {
            setAllState(res.data.data[0])
            setLoading(false)
            setIsUpData(id)
          }
        })
      }

      fetchData()
    }

  }, [])



  const handelCansel = () => {
    setAllState(defaulValue)
  }


  const handelDeletImage = () => {
    setAllState({ ...allState, img: '' })
  }


  const handelSaveData = async (e: any) => {
    e.preventDefault()
    setLoadingBtn(true)

    if (isUpData) {
      await upDataCard(isUpData, allState).then(res => console.log(res)).catch(err => console.log(err))
    }
    else {
      await postCard(allState).then(async res => {
        console.log(res);
        if (res.data.message) {
          await Swal.fire({
            icon: 'error',
            title: 'Filed',
            text: `${res.data.message}`
          })
          setLoadingBtn(false)
        } else {
          if (res.data.msg) {
            await Swal.fire({
              icon: 'success',
              title: 'success',
              text: `${res.data.msg}`
            })
            setLoadingBtn(false)
            setAllState(defaulValue)
          }
        }
      })
    }
  }

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handelImage = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file)
    setAllState({ ...allState, img: base64 })
  }


  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form onSubmit={(e) => handelSaveData(e)} className="w-[90%] md:w-[50%] bg-slate-50 border border-gray-700 rounded-lg p-4 mx-24 flex flex-col items-center justify-center gap-4">

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2" >

          <MdFastfood className="text-xl text-gray-700" />
          <input
            minLength={3}
            maxLength={12}
            required
            type="text"
            value={allState.title}
            onChange={(e) => setAllState({ ...allState, title: e.target.value })}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-gray-600"
          />
        </div>

        <div className="w-full py-2 border-b border-gray-300 flex justify-between items-center gap-2">


          <div className="flex items-center justify-center w-full flex-col">
            <label htmlFor="small" className="flex mb-2 text-sm font-medium  text-gray-900">Discount</label>
            <select id="small"
              required
              value={allState.discount}
              onChange={(e) => setAllState({ ...allState, discount: e.target.value })}
              className="flex p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ">
              <option selected value="0">none</option>
              <option value={`0.10`}>10%</option>
              <option value={`0.20`}>20%</option>
              <option value={`0.30`}>30%</option>
              <option value={`0.40`}>40%</option>
              <option value={`0.50`}>50%</option>
              <option value={`0.60`}>60%</option>
              <option value={`0.70`}>70%</option>
              <option value={`0.80`}>80%</option>
              <option value={`0.90`}>90%</option>
            </select>
          </div>


          <div className="flex items-center justify-center w-full flex-col">
            <label htmlFor="small" className="flex mb-2 text-sm font-medium  text-gray-900">Type</label>
            <select id="small"
              required
              value={allState.type}
              onChange={(e) => setAllState({ ...allState, type: e.target.value })}
              className="flex p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ">
              <option value="drink">Drink</option>
              <option value="meat">Meat</option>
              <option value="pasta">Pasta</option>
              <option value="salad">Salad</option>
              <option value="soup">Soup</option>
              <option value="vegetable">Vegetable</option>
              <option value="chicken">Chicken</option>
              <option value="purger">Burger</option>
              <option value="Pizza">Pizza</option>
              <option selected value="Other">Other</option>
            </select>
          </div>
        </div>


        <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 mx-[200px] w-full h-[225px] md:h-[300px] cursor-pointer">
          <>
            {isLoading ? (
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
                      <input type='file' accept=".jpeg, .png, .jpg" multiple={false} value={allState.img} onChange={(e) => handelImage(e)} />
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
              type="number"
              required
              value={allState.pieces}
              onChange={(e) => setAllState({ ...allState, pieces: e.target.value })}
              placeholder="pieces"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-gray-600"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />

            <input
              type="number"
              required
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
            minLength={12}
            maxLength={100}
            required
            value={allState.desc}
            onChange={(e) => setAllState({ ...allState, desc: e.target.value })}
            placeholder="desc"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-gray-600"
          />
        </div>

        <div className="flex items-center justify-between w-full">
          {isLoadingBtn ? (
            <div className="ml-0  w-24   border-none outline-none flex justify-center items-center bg-emerald-500 px-2 py-2 rounded-lg text-lg text-white font-semibold" >
              <Loader />
            </div>
          ) : (
            <button
              type="submit"
              className="ml-0  w-24   border-none outline-none bg-emerald-500 px-2 py-2 rounded-lg text-lg text-white font-semibold"
              onSubmit={handelSaveData}
            >
              Save
            </button>
          )}
          <button
            type="button"
            className="ml-0  w-24  border-none outline-none bg-red-500 px-2 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={handelCansel}
          >
            Cansel
          </button>

        </div>
      </form>
    </div>
  )
}

export default CreatItem

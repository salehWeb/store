import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { BsEyeSlash, BsEye } from 'react-icons/bs'

const Singin = ({ isLoginOrSingIn, setIsLoginOrSingIn }: any) => {

  const DefultFormVaule: any = {
    userName: '',
    password: '',
    email: ''
  }

  const [forms, setForms] = useState(DefultFormVaule)
  const [eye, setEye] = useState(false)

  const handelEye = () => {
    setEye(!eye)
  }

  const handelSubmit = (e: any) => {
    e.preventDefault()
    console.log(forms)
    setForms(DefultFormVaule)
  }
  return (
    <>
      <form onSubmit={(e) => handelSubmit(e)} className='lg:min-w-[66%] min-w-[80%] bg-white rounded-md shadow-lg p-4'>

        <h1 className='text-2xl mb-4'>Sing in <hr className='mt-2' /></h1>

        <div className="mb-6">
          <label>User name</label>
          <input
            type="text"
            value={forms.userName}
            onChange={(e) => setForms({ ...forms, userName: e.target.value })}
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="User name"
            required
            autoComplete='on'
            minLength={4}
            maxLength={12}
          />
        </div>

        <div className="mb-6">
          <label>Email address</label>
          <input
            type="email"
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Email address"
            required
            autoComplete='on'
            value={forms.email}
            onChange={(e) => setForms({ ...forms, email: e.target.value })}
          />
        </div>

        <div className="mb-6 relative">
          <label>Password</label>
          <input
            type={eye ? 'text' : 'password'}
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Password"
            required
            autoComplete='on'
            minLength={8}
            maxLength={12}
            value={forms.password}
            onChange={(e) => setForms({ ...forms, password: e.target.value })}
          />
          <div className="border absolute transition-all duration-150 ease-in-out top-[25px] right-[1px] h-[44px] rounded-lg p-2 cursor-pointer hover:bg-slate-100"
            onClick={handelEye}
          >
            {eye ? (
              <BsEye className='min-h-full w-8' />
            ) : (
              <BsEyeSlash className='min-h-full w-8' />
            )}

          </div>
        </div>

        <div className='justify-center items-center flex mb-4 self-center'> all ready have an acount
          <span className="underline text-blue-600 cursor-pointer ml-2" onClick={() => setIsLoginOrSingIn(true)}>login</span>
        </div>

        <button
          type="submit"
          className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          Sing in
        </button>

        <div
          className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
        >
          <p className="text-center font-semibold mx-4 mb-0">OR</p>
        </div>

        <a
          className="px-7 py-3 text-white font-medium relative text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center  items-center"
          style={{ backgroundColor: "#55acee" }}
          role="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >

          <FcGoogle className=' flex w-10 lg:w-16 md:w-14 p-[2px] rounded-sm min-h-full absolute left-0 bg-white shadow-md ' />
          <p className="flex text-md  lg:text-lg">with Google</p>
        </a>
      </form>
    </>
  )
}

export default Singin
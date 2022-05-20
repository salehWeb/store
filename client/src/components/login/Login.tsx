import { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { BsEyeSlash, BsEye } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { login } from '../../context/useractioan'
import * as actionTypes from '../../context/actionTypes'

const Login = ({ isLoginOrSingIn, setIsLoginOrSingIn }: any) => {
  const dispatch: any = useDispatch()

  const { userMsg }: any = useSelector((state: any) => state.auth)

  const DefultFormVaule: any = {
    password: '',
    email: ''
  }

  const [forms, setForms] = useState(DefultFormVaule)
  const [eye, setEye] = useState(false)
  const [dispeldButtton, setDispeldButtton] = useState(false)

  const [msg, setMsg] = useState(userMsg)


  useEffect(() => {
    setMsg(userMsg)
    setDispeldButtton(false)

  }, [userMsg])



  const handelEye = () => {
    setEye(!eye)
  }
  /*  
  sadsafew
  wefewfew@gmail.com
  weweeggewffw
  */

  const handelSubmit = async (e: any) => {
    
    dispatch({ type: actionTypes.GET_LOGIN, payload: null })

    e.preventDefault()
    // setDispeldButtton(true)


    await dispatch(login(forms))

    if (msg?.msg?.data?.msg === ' password is wrong Try agin!. ') {


      await Swal.fire({
        icon: 'error',
        title: 'password is wrong !',
        text: `${msg?.msg?.data?.msg}`
      })

      setDispeldButtton(false)
    }

    else if (msg?.msg?.data?.msg === ' login sucsas ') {


      await Swal.fire({
        icon: 'success',
        title: 'success',
        text: `${msg?.msg?.data?.msg}`
      })
      setForms(DefultFormVaule)
      setDispeldButtton(false)

    }

    else if (msg?.msg?.data?.msg === ' the email is wrong try agin!. or sing in if do not have an account ') {


      await Swal.fire({
        icon: 'error',
        title: 'email is wrong !',
        text: `${msg?.msg?.data?.msg}` /// 
      })

      setDispeldButtton(false)

    }

  }

  return (
    <>
      <form onSubmit={(e) => handelSubmit(e)} className='lg:min-w-[66%] min-w-[80%] bg-white rounded-md shadow-lg p-4'>


        <h1 className='text-2xl mb-4'>Login <hr className='mt-2' /></h1>
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

        <div className="flex justify-center items-center mb-6">
          <p>do not have an acount <span onClick={() => setIsLoginOrSingIn(false)} className="underline text-blue-600 cursor-pointer">Sing  in</span></p>
        </div>

        <button
          disabled={dispeldButtton}
          type="submit"
          className={`inline-block px-7 py-3 ${dispeldButtton ? 'bg-gray-400' : 'bg-blue-600'} ease-in-out duration-100 transition-all  text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg w-full`}
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          {dispeldButtton ? (
            <div className="flex justify-center items-center w-full ">
              <svg role="status" className="w-8 h-8 mr-2 text-gray-200 animate-spin flex self-center dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
            </div>
          ) : (
            'Login'
          )}
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
          href='#a'
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

export default Login
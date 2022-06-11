import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { BsEyeSlash, BsEye } from 'react-icons/bs'
import Swal from 'sweetalert2'
import { getUser, loginWithGoogle } from '../../server/index'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import LoderBtn from '../tools/LoderBtn'
import {motion} from 'framer-motion'

const Login = () => {
  const history = useNavigate()
  const DefultFormVaule: any = {
    password: '',
    email: ''
  }

  const Client_ID = process.env.REACT_APP_VAR_ClEINT_ID === undefined ? '' : process.env.REACT_APP_VAR_ClEINT_ID;

  const [forms, setForms] = useState(DefultFormVaule)
  const [eye, setEye] = useState(false)
  const [dispeldButtton, setDispeldButtton] = useState(false)
  const [googleBtn, setDispeldGoogle] = useState(false)



  const handelEye = () => {
    setEye(!eye)
  }


  const handelSuccess = async (res: any) => {

    let msg: any;
    let data: any;

    const { profileObj } = await res


    await loginWithGoogle({ email: profileObj.email }).then((r) => {
      msg = r.data.msg
      data = r.data
      console.log(r)

    }).catch(async (e) => {
      setDispeldGoogle(false)
      return await Swal.fire({
        icon: 'error',
        title: 'filed',
        text: `${e.message}`
      })
    })

    if (msg === ' login sucsas ') {

      await Swal.fire({
        icon: 'success',
        title: 'success',
        text: `${msg}`
      })
      history("/Welcom#top")
      localStorage.setItem('profile', JSON.stringify({ user: data.user, token: data.token }))


      setForms(DefultFormVaule)
      setDispeldGoogle(false)

    }

    else if (msg === ' the email is wrong try agin!. or sing in if do not have an account ') {

      await Swal.fire({
        icon: 'error',
        title: 'email is wrong !',
        text: `${msg}`
      })

      setDispeldGoogle(false)
    }
  }

  const handelFailure = async (err: any) => {
    if (err.message) {
      return await Swal.fire({
        icon: 'error',
        title: 'filed',
        text: `${err.message}`
      })
    }
  }

  const handelSubmit = async (e: any) => {
    let data: any;
    let msg: any;

    e.preventDefault()
    setDispeldButtton(true)

    await getUser(forms).then((r) => {
      msg = r.data.msg
      data = r.data

    }).catch(async (e) => {
      setDispeldButtton(false)
      return await Swal.fire({
        icon: 'error',
        title: 'filed',
        text: `${e.message}`
      })
    })

    if (msg === ' login sucsas ') {

      await Swal.fire({
        icon: 'success',
        title: 'success',
        text: `${msg}`
      })
      history("/Welcom")

      localStorage.setItem('profile', JSON.stringify({ user: data.user, token: data.token }))
      setForms(DefultFormVaule)
      setDispeldButtton(false)

    }
    else if (msg === ' the email is wrong try agin!. or sing in if do not have an account ') {

      await Swal.fire({
        icon: 'error',
        title: 'email is wrong !',
        text: `${msg}`
      })

      setDispeldButtton(false)

    }

  }

  return (
    <>
      <section className="h-screen w-full ">
        <div className="container px-6 py-12 w-full h-full">
          <div className="flex justify-center items-center  w-full h-full text-gray-800 ">
            <motion.form 
            initial={{opacity: 0, y: -200}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            onSubmit={(e) => handelSubmit(e)} className=' bg-white w-[30rem] h-auto rounded-md shadow-lg p-4'>
              <h1 className='text-2xl mb-4'>Login <hr className='mt-2' /></h1>
              <div className="mb-6">
                <label className="sr-only">Email address</label>
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
                <label className="sr-only">Password</label>
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
                <div className="border absolute transition-all duration-150 ease-in-out top-[1px] right-[1px] h-[44px] rounded-lg p-2 cursor-pointer hover:bg-slate-100"
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
                <p>do not have an acount <Link to='/singin#top' className="underline text-blue-600 cursor-pointer">Sing  in</Link></p>
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
                    <LoderBtn />
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





              <GoogleLogin
                clientId={Client_ID}
                render={(prop: any) => (
                  <button 
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    onClick={prop.onClick}
                    className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-md flex justify-center items-center text-md px-5 py-2.5 text-center min-w-full mb-2">
                    <FcGoogle className="w-6 h-6 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" />
                    Login in with Google
                  </button>
                )}
                onSuccess={handelSuccess}
                onFailure={handelFailure}
              />

            </motion.form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
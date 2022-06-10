import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { BsEyeSlash, BsEye } from 'react-icons/bs'
import Swal from 'sweetalert2'
import { setUser, SingWithGoogle } from '../../server'
import GoogleLogin from 'react-google-login'
import { Link, useNavigate } from 'react-router-dom'
import LoderBtn from '../tools/LoderBtn'

const Singin = () => {
  const history = useNavigate()
  const DefultFormVaule: any = {
    name: '',
    password: '',
    email: ''
  }
  
  const Client_ID = process.env.REACT_APP_VAR_ClEINT_ID === undefined ? '' : process.env.REACT_APP_VAR_ClEINT_ID;

  const [forms, setForms] = useState(DefultFormVaule)
  const [eye, setEye] = useState(false)

  const [dispeldButtton, setDispeldButtton] = useState(false)

  const handelEye = () => {
    setEye(!eye)
  }

  const handelSuccess = async (res: any) => {

    const { profileObj, tokenId } = await res
    const user: Object = { profile: profileObj, token: tokenId }
    const userData = {
      email: profileObj.email,
      name: profileObj.name
    }
    let msg: any;
    await SingWithGoogle(userData).then((r) => msg = r.data).catch(async (e) => {
      setDispeldButtton(false)
      console.log(e)
      return await Swal.fire({
        icon: 'error',
        title: 'filed',
        text: `${e.message}`
      })
    })

    if (msg.msg === " acount sucssfuly created ") {
      console.log(msg)
      await Swal.fire({
        icon: 'success',
        title: 'success',
        text: `${msg.msg}`
      })
      history('/login')

      setDispeldButtton(false)
      setForms(DefultFormVaule)

    }

    if (msg.msg === " this account is already exist!. try login.") {
      console.log(msg)

      await Swal.fire({
        icon: 'error',
        title: 'felid',
        text: `${msg.msg}`
      })

      setDispeldButtton(false)
    console.log(user)
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


    let msg: any;
    setDispeldButtton(true)
    e.preventDefault()

    await setUser(forms).then((r) => msg = r.data.msg).catch(async (e) => {
      setDispeldButtton(false)

      return await Swal.fire({
        icon: 'error',
        title: 'filed',
        text: `${e.message}`
      })
      
    })

    if (msg === " acount sucssfuly created ") {

      await Swal.fire({
        icon: 'success',
        title: 'success',
        text: `${msg}`
      })
      history('/login')
      setDispeldButtton(false)
      setForms(DefultFormVaule)

    }

    if (msg === " this account is already exist!. try login.") {

      await Swal.fire({
        icon: 'error',
        title: 'felid',
        text: `${msg}`
      })

      setDispeldButtton(false)

    }
  }



  return (
    <>
      <section className="h-screen w-full ">
        <div className="container px-6 py-12 w-full h-full">
          <div className="flex justify-center items-center w-full h-full text-gray-800 ">
            <form onSubmit={(e) => handelSubmit(e)} className='lg:min-w-[66%] min-w-[80%] bg-white rounded-md shadow-lg p-4'>

              <h1 className='text-2xl mb-4'>Sing in <hr className='mt-2' /></h1>

              <div className="mb-6">
                <label className="sr-only">User name</label>
                <input
                  type="text"
                  value={forms.name}
                  onChange={(e) => setForms({ ...forms, name: e.target.value })}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="User name"
                  required
                  autoComplete='on'
                  minLength={4}
                  maxLength={12}
                />
              </div>

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

              <div className='justify-center items-center flex mb-4 self-center'> all ready have an acount
                <Link to='/login#top' className="underline text-blue-600 cursor-pointer ml-2" >login</Link>
              </div>

              <button
                type="submit"
                className={`inline-block px-7 py-3 ${dispeldButtton ? 'bg-gray-400' : 'bg-blue-600'} ease-in-out duration-100 transition-all  text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg w-full`}
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                disabled={dispeldButtton}
              >
                {dispeldButtton ? (
                  <div className="flex justify-center items-center w-full ">
                    <LoderBtn />
                  </div>
                ) : (
                  'Sing in'
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
                  <div
                    className="px-7 font-medium bg-gray-300 text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center  items-center"
                    role="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    onClick={prop.onClick}
                  >
                    <FcGoogle className=' flex w-10 h-8 lg:w-16 md:w-14 p-[2px] rounded-sm min-h-full  ' />
                  </div>
                )}
                onSuccess={handelSuccess}
                onFailure={handelFailure}
              />

            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Singin
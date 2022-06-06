import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { postPayments } from '../../server'
import Loader from '../tools/Loader'
import { useDispatch } from 'react-redux'
import * as actionTypes from '../../context/actionTypes'

const TotalCard = ({ Total }: any) => {
    const dispatch = useDispatch() 
    const history = useNavigate() 
    const haveItems = localStorage.getItem('cardItems')
    const items = haveItems && JSON.parse(haveItems).length
    const [Items, setitems] = useState(items)
    const [LoadingBtn, setLoadingBtn] = useState(false)

    useEffect(() => { }, [dispatch])

    useEffect(() => { setitems(items) }, [haveItems, items])

    const handelPayment = async () => {

        const haveLogin = localStorage.getItem('profile')
        const { user } = haveLogin && JSON.parse(haveLogin)
        if (!user) {
            await Swal.fire({
                title: 'You need to login first',
                icon: 'warning',
                confirmButtonText: 'Login',
                confirmButtonColor: '#3085d6',
                showClass: {
                    popup: 'animated fadeInDown faster'
                },
            })
        }



        else {
            setLoadingBtn(true)
            let items = [];
            const data = localStorage.getItem('cardItems')
            const isData = data && JSON.parse(data)

            for (let i = 0; i < isData.length; i++) {
                const { _id, title, price, Total, discount }: any = isData[i]

                const item = {
                    _id,
                    title,
                    price,
                    q: Total / (price - price * discount),
                    discount
                }
                items.push(item)
            }

            await postPayments({ items, user }).then(async res => {
                console.log("fuck u");
                if (res.data.msg === "sucses created") {
                    await Swal.fire({
                        title: 'Payment Successful',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#3085d6',
                        showClass: {
                            popup: 'animated fadeInDown faster'
                        },
                    })

                    dispatch({ type: actionTypes.SET_TOTAL, payload: 0 })
                    dispatch({ type: actionTypes.REST_CARD_ITEMS })

                    history('/')
                    
                    setitems(0)
                    
                    setLoadingBtn(false)
                } 
                else {
                    await Swal.fire({
                        title: 'Payment Failed',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#3085d6',
                        showClass: {
                            popup: 'animated fadeInDown faster'
                        },
                    })
                    setLoadingBtn(false)
                }

            })
            .catch(async (err: any) => {
                await Swal.fire({
                    title: 'Payment Failed',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#3085d6',
                    showClass: {
                        popup: 'animated fadeInDown faster'
                    },
                })
                setLoadingBtn(false)
            })
        }
        setLoadingBtn(false)
    }

    return (
        <section className='flex flex-col lg:ml-16 justify-center items-center rounded-lg md:mx-12 h-fit  lg:mt-6 shadow-lg bg-white p-8'>
            <p className="flex p-2 text-base font-semibold text-black">
                {Items > 1 ?
                    `items: ${Items}` :
                    `one item`}
            </p>
            <div className="flex justify-center items-center">
                <h1 className="flex font-semibold text-xl text-black p-2">total $:{Total}</h1>
            </div>
            <hr className='bg-black w-full h-[1px]' />
            {!LoadingBtn ? (
            <Button onClick={handelPayment} variant='outlined' className='bg-gradient-to-tr m-4 flex from-blue-300 to-blue-600 duration-500  border-[0] ease-in-out hover:bg-gradient-to-r'><span className="z-10 text-white text-base">check out!</span></Button>
            ) : (
                <Button disabled variant='outlined' className='bg-gradient-to-tr m-4 flex from-blue-300 to-blue-600 duration-500  border-[0] ease-in-out hover:bg-gradient-to-r justify-center items-center'><Loader /></Button>
            )}
            <div className="w-full flex justify-center items-center">
                <p className="text-gray-700 justify-center items-center"> do Not have an count !</p>
                <Link to='/singin' className='text-blue-600 hover:underline'>Sing in</Link>
            </div>
        </section>
    )
}

export default TotalCard
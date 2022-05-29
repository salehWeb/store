import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const TotalCard = ({Total}: any) => {


    const haveItems = localStorage.getItem('cardItems')
    const items = haveItems && JSON.parse(haveItems).length
    const [Items, setitems] = useState(items)
    useEffect(() => { setitems(items) }, [haveItems, items] )

    return (
        <section className='flex flex-col lg:ml-16 justify-center items-center rounded-lg md:mx-12 h-fit  lg:mt-6 shadow-lg bg-white p-8'>
            <p className="flex p-2 text-base font-semibold text-black">
                {Items > 1 ? 
                `items: ${Items}` : 
                `one item` }
                </p>
            <div className="flex justify-center items-center">
                <h1 className="flex font-semibold text-xl text-black p-2">total $:{Total}</h1>
            </div>
            <hr className='bg-black w-full h-[1px]'/>
            <Button variant='outlined' className='bg-gradient-to-tr m-4 flex from-blue-300 to-blue-600 duration-500  border-[0] ease-in-out hover:bg-gradient-to-r'><span className="z-10 text-white text-base">check out!</span></Button>
            <div className="w-full flex justify-center items-center">
                <p className="text-gray-700 justify-center items-center"> do Not have an count !</p>
                <Link to='/singin' className='text-blue-600 hover:underline'>Sing in</Link>
            </div>
        </section>
    )
}

export default TotalCard
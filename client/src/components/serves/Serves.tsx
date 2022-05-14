import React from 'react'
import { Typography } from '@mui/material'
import { MdAlarm, MdAdminPanelSettings, MdVerified, MdBuild } from 'react-icons/md'

const Serves = () => {
    return (

        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-auto mt-[200px]">
                <div className=" w-full">
                    <h2 className="text-blue-600 flex text-2xl font-semibold ">
                        How We Are?
                    </h2>
                    <p className="text-gray-500 block">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, in.
                    </p>
                </div>
            </div>
            <div className="w-full h-[0.5px] bg-blue-700 flex my-6 px-16 self-start rounded-full"></div>
            <div className="grid my-[30px] gap-2 lg:grid-cols-4 md:grid-cols-2  sm:grid-cols-1 mx-8">



                <div className="flex  shadow-lg border flex-col  border-blue-600 px-6 py-3 rounded-lg drop-shadow-lg justify-center items-center bg-Blur relative">
                    <div className="flex w-full justify-start items-start ">
                        <MdVerified className='flex  shadow-lg bg-Blur  text-blue-500 text-3xl mb-2 p-1 rounded-lg drop-shadow-lg ' />
                        <h5 className='ml-2 flex self-start'>Lorem, ipsum. dolor sit am</h5>
                    </div>

                    <p className="text-gray-500 w-full flex justify-center items-center">
                        Lorem ipsum dolor sit amet consectetur.lorem
                        Lorem ipsum dolor sit amet consectetur.lorem
                    </p>
                </div>


                <div className="flex  shadow-lg border flex-col  border-blue-600 px-6 py-3 rounded-lg drop-shadow-lg justify-center items-center bg-Blur relative">
                    <div className="flex w-full justify-start items-start ">
                        <MdBuild className='flex  shadow-lg bg-Blur  text-blue-500 text-3xl mb-2 p-1 rounded-lg drop-shadow-lg ' />
                        <h5 className='ml-2 flex self-start'>Lorem, ipsum. dolor sit am</h5>
                    </div>

                    <p className="text-gray-500 w-full flex justify-center items-center">
                        Lorem ipsum dolor sit amet consectetur.lorem
                        Lorem ipsum dolor sit amet consectetur.lorem
                    </p>
                </div>

                <div className="flex  shadow-lg border flex-col  border-blue-600 px-6 py-3 rounded-lg drop-shadow-lg justify-center items-center bg-Blur relative">
                    <div className="flex w-full justify-start items-start ">
                        <MdAdminPanelSettings className='flex  shadow-lg bg-Blur  text-blue-500 text-3xl mb-2 p-1 rounded-lg drop-shadow-lg ' />
                        <h5 className='ml-2 flex self-start'>Lorem, ipsum. dolor sit am</h5>
                    </div>

                    <p className="text-gray-500 w-full flex justify-center items-center">
                        Lorem ipsum dolor sit amet consectetur.lorem
                        Lorem ipsum dolor sit amet consectetur.lorem
                    </p>
                </div>


                <div className="flex  shadow-lg border flex-col  border-blue-600 px-6 py-3 rounded-lg drop-shadow-lg justify-center items-center bg-Blur relative">
                    <div className="flex w-full justify-start items-start ">
                        <MdAlarm className='flex  shadow-lg bg-Blur  text-blue-500 text-3xl mb-2 p-1 rounded-lg drop-shadow-lg ' />
                        <h5 className='ml-2 flex self-start'>Lorem, ipsum. dolor sit am</h5>
                    </div>

                    <p className="text-gray-500 w-full flex justify-center items-center">
                        Lorem ipsum dolor sit amet consectetur.lorem
                        Lorem ipsum dolor sit amet consectetur.lorem
                    </p>
                </div>


            </div>
        </>

    )
}

export default Serves
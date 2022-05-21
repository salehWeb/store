import React, { useEffect, useState } from 'react'
import Login from './Login'
import Singin from './Singin'



const Main = () => {
    const [isLoginOrSingIn, setIsLoginOrSingIn] = useState(true)


    return (
        <section className="h-screen w-full ">
            <div className="container px-6 py-12 w-full h-full">
                <div className="flex justify-center items-center w-full h-full text-gray-800 ">
                    {isLoginOrSingIn ? (
                        <Login setIsLoginOrSingIn={setIsLoginOrSingIn} isLoginOrSingIn={isLoginOrSingIn} />
                    ) : (
                        <Singin setIsLoginOrSingIn={setIsLoginOrSingIn} isLoginOrSingIn={isLoginOrSingIn} />
                    )}
                </div>
            </div>
        </section>
    )
}

export default Main
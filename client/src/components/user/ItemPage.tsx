import React, { useEffect } from 'react'
import { sesrshQurey } from '../../server'



const ItemPage = () => {
    let User = localStorage.getItem('profile')
    let us = User && JSON.parse(User).user.name
    useEffect(() => {
        sesrshQurey(window.location.search.split("=")[1]).then(res => console.log(res))
            .catch(error => console.log(error))
        console.log(window.location.search.split("=")[1])

    }, [])


    return (
        <div>
            {/* {Svg && (
                <>    
                            <Svg />
                </>
            )} */}
            hello world
            <img src={`https://avatars.dicebear.com/api/bottts/${us}.svg`} alt='hello world' />
        </div>
    )
}

export default ItemPage
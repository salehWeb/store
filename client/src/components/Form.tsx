import { GoogleLogin } from 'react-google-login';
import { Client_ID } from './Secret';
import * as actionTypes from '../context/actionTypes';
import { useDispatch } from 'react-redux';

const Form = () => {
    const dispatch = useDispatch()

    let user;
    const isUser: Boolean = localStorage.getItem('user') ? true : false;
    if (isUser) {
        user = JSON.parse(localStorage.getItem('user') || '{}')
    }

    const handelSuccess = async (res: any) => {
        if (!isUser) {
            const { profileObj } = res
            const { tokenId } = res
            const user: any = { user: { profile: profileObj, token: tokenId } }
            dispatch({ type: actionTypes.SET_USER, payload: { user: { tokenId, profileObj } } })
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            return null
        }
    }
    const handelFailure = (error: String) => {
        console.log(error)
    }
    return (
        <div>
            {/* <GoogleLogin
                clientId={Client_ID}
                render={(prop) => (
                    <button className='w-full p-7 bg-green-500'
                        onClick={() => console.log(prop.disabled)}
                    >
                        Google </button>
                )}
                onSuccess={handelSuccess}
                onFailure={handelFailure}
            /> */}
        </div>
    )
}

export default Form
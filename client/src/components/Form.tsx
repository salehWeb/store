import { GoogleLogin } from 'react-google-login';
import {Client_ID} from './Secret';

const Form = () => {
    const handelSuccess = async (res: any) => {
        await console.log(res);
        // const {profileObj} = res
        // const {tokenId} = res
        // await console.log(profileObj, tokenId)
    }
    const handelFailure = (error: any) => {
        console.log(error)
    }
    return (
        <div>
            <GoogleLogin
                clientId={Client_ID}
                render={(prop) => (
                    <button className='w-full p-7 bg-green-500'
                    onClick={prop.onClick} 
                    disabled={prop.disabled}>
                        Google </button>
                )}
                onSuccess={handelSuccess}
                onFailure={handelFailure}
            />
        </div>
    )
}

export default Form
import NotFoundImage from '../../img/404-not-found.png'

const NotFound = () => {
    return (
        <div className='min-h-[60vh] flex items-center justify-center'>
            <img src={NotFoundImage} alt="Not Found" />
        </div>
    )
}

export default NotFound
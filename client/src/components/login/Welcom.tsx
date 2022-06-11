import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'

const Welcom = () => {
  const isHaveAcount = localStorage.getItem('profile')
  const user = isHaveAcount && JSON.parse(isHaveAcount).user
  const isAdman = isHaveAcount && JSON.parse(isHaveAcount).user?.isAdman
  return (
    <motion.div 
    initial={{opacity: 0, y: -200}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.8}}
    className='flex justify-around flex-col items-center min-h-[60vh] w-full'>
      {isAdman ? (
        <h1 className='flex text-gray-300 bg-gray-800 rounded-lg p-4 text-2xl'>
          welcome adman <em> &nbsp; {user.name}</em>
        </h1>
      ) : (
        <h1 className='flex text-gray-300 bg-gray-800 rounded-lg p-4 text-2xl'>
          welcome M/Ms <em> &nbsp; {user.name}</em>
        </h1>
      )}

      <div className="flex">
        <Link to='/' className="flex items-center gap-2 cursor-pointer">
        <p className="flex text-lg hover:underline hover:text-blue-500">do you want see our prodect ?</p>
        </Link>
      </div>
    </motion.div>
  )
}

export default Welcom
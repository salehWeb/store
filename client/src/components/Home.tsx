import img from '../img/delivery.png'
import imgTwo from '../img/img.jpg'

const Home = () => {
    return (
            <section id='home' className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full'>
                <div className="py-4 gap-6 justify-center md:justify-start flex-1 flex flex-col items-start ">
                    <div className='flex shadow-xl items-center gap-2 md:justify-start justify-center px-2 py-1 rounded-full bg-blue-200'>
                        <p className='text-base text-blue-600 font-semibold'>Bike delivery</p>
                        <div className="w-10 h-8 overflow-hidden md:ml-10 shadow-blue-400 shadow-md rounded-full">
                            <img src={img} alt="delivery" className='bg-white w-full h-full object-contain' />
                        </div>
                    </div>
                    <div className="flex md:justify-start">
                        <p className="font-bold text-[2rem] lg:text-[3rem] md:text-[2.5rem] tracking-[1px] text-gray-800 ">
                            Lorem ipsum dolor sit amen
                            <span className="text-blue-600 lg:text-[4rem] mt-2 md:text-[3rem] shadow-blue-400 shadow-md bg-white flex text-center justify-center text-[2.5rem]">Lorem ipsum</span>
                        </p>
                    </div>
                    <p className="text-base text-gray-600 text-center md:text-left">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis placeat alias maxime aliquam omnis quod illo repellendus ad, possimus corporis facilis porro eum cum temporibus rem odit tempore quia pariatur?
                    </p>
                    <button className='bg-gradient-to-br md:justify-end items-end hover:border-blue-500 hover:border-2 md:w-[33%] duration-100 transition-all ease-in-out rounded-md shadow-gray-400 shadow-lg from-blue-400 to-blue-500 w-full px-1 py-2'>
                        Lorem ipsum
                    </button>
                </div>
                <div className="py-4 flex-1">
                <div className="w-full flex justify-center items-center relative">
                    <img src={imgTwo} alt="background" />
                </div>
                </div>
            </section>
    )
}

export default Home
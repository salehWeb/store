import { useEffect, useState } from 'react'
import { BsCartDashFill } from 'react-icons/bs'

const Cart = () => {
    const isHaveCard = localStorage.getItem('cardItems')
    const card = isHaveCard ? JSON.parse(isHaveCard) : []
    const [cards, setCards] = useState(card)

    const handelDelet = (id: any) => {
        const filterd = cards.filter((item: any) => item._id !== id)
        setCards(filterd)
        localStorage.setItem('cardItems', JSON.stringify(filterd))
    }

    useEffect(() => {}, [isHaveCard, cards])

    return (
        <section className='w-full h-auto min-h-screen'>
            {cards && cards.length > 0 ? (
                <div className="w-full h-full gap-4 flex flex-col">
                    {cards.map((item: any) => (
                        <div key={item._id} className="w-full my-6 h-full flex bg-white rounded-lg">
                            <div className="flex relative h-full w-[50%] flex-row flex-wrap justify-between rounded-lg">
                                
                                <div className="bg-gray-800 shadow-lg  rounded-lg  -top-7 left-[75px] w-[39%] h-10 items-center justify-center flex  absolute">
                                    <p className="text-gray-500">price:{item.price}</p>
                                </div>
                                
                                <div className="h-32 w-[25rem] flex   rounded-lg  bg-white ">
                                    <img className=' w-full h-full object-contain' src={item.img} alt={item.title} />
                                </div>
                                
                                <div className="h-32 w-[25rem] flex rounded-lg justify-center items-center">
                                    <BsCartDashFill onClick={() => handelDelet(item._id)} className='flex text-[2rem] cursor-pointer hover:from-red-400 hover:text-red-700 transition-all bg-gradient-to-tr from-red-300 to-red-60  text-red-500  rounded-lg ' />
                                </div>
                            </div>
                            <div className=" w-full h-full flex flex-end flex-col  justify-center items-center">
                                <p className="text-base  ">{item.title}
                                    <span className='h-[1px] w-full   bg-gradient-to-tr from-blue-300 to-blue-600  flex flex-row'></span></p>
                                <br />
                                <p className="text-gray-500 flex self-start">{item.desc} wegewge ebeberberbe ebrebebreb erbreberbreb egrebreberb brebre</p>
                                <div className="flex self-end h-full rounded-lg justify-end mr-4 my-6 bg-gray-800">
                                    <div className="p-2 flex flex-row">
                                        <span className="flex text-white cursor-pointer text-base ">+</span>
                                        <span className="flex bg-gradient-to-tr rounded-lg px-2 mx-2 from-blue-300 text-base  to-blue-600 ">5</span>
                                        <span className="flex text-white cursor-pointer text-base ">-</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>your card is empty</p>
            )}
        </section>
    )
}

export default Cart

// import React, { useEffect, useState } from "react";
// import { MdOutlineKeyboardBackspace } from "react-icons/md";
// import { RiRefreshFill } from "react-icons/ri";

// import { motion } from "framer-motion";
// import { useStateValue } from "../context/StateProvider";
// import * as actionTypes  from "../context/actionTypes";
// import EmptyCart from "../img/emptyCart.svg";
// import CartItem from "./CartItem";

// const CartContainer = () => {
//     const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
//     const [flag, setFlag] = useState(1);
//     const [tot, setTot] = useState(0);

//     const showCart = () => {
//         dispatch({
//             type: actionTypes.SET_CART_SHOW,
//             cartShow: !cartShow,
//         });
//     };

//     useEffect(() => {
//         let totalPrice = cartItems.reduce(function (accumulator, item) {
//             return accumulator + item.qty * item.price;
//         }, 0);
//         setTot(totalPrice);
//         console.log(tot);
//     }, [tot, flag]);

//     const clearCart = () => {
//         dispatch({
//             type: actionTypes.SET_CARTITEMS,
//             cartItems: [],
//         });

//         localStorage.setItem("cartItems", JSON.stringify([]));
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, x: 200 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 200 }}
//             className="fixed top-0 right-0 w-full md:w-[375px] h-screen bg-white drop-shadow-md flex flex-col z-[101]"
//         >
//             <div className="w-full flex items-center justify-between p-4 cursor-pointer">
//                 <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
//                     <MdOutlineKeyboardBackspace className="text-gray-500 text-3xl" />
//                 </motion.div>
//                 <p className="text-gray-500 text-lg font-semibold">Cart</p>

//                 <motion.p
//                     whileTap={{ scale: 0.75 }}
//                     className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-gray-500 text-base"
//                     onClick={clearCart}
//                 >
//                     Clear <RiRefreshFill />
//                 </motion.p>
//             </div>

//             {cartItems && cartItems.length > 0 ? (
//                 <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
//                     <div className="w-full h-[340px] md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
//                         {cartItems &&
//                             cartItems.length > 0 &&
//                             cartItems.map((item: any) => (
//                                 <CartItem
//                                     key={item.id}
//                                     item={item}
//                                     setFlag={setFlag}
//                                     flag={flag}
//                                 />
//                             ))}
//                     </div>

//                     <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
//                         <div className="w-full flex items-center justify-between">
//                             <p className="text-gray-400 text-lg">Sub Total</p>
//                             <p className="text-gray-400 text-lg">$ {tot}</p>
//                         </div>
//                         <div className="w-full flex items-center justify-between">
//                             <p className="text-gray-400 text-lg">Delivery</p>
//                             <p className="text-gray-400 text-lg">$ 2.5</p>
//                         </div>

//                         <div className="w-full border-b border-gray-600 my-2"></div>

//                         <div className="w-full flex items-center justify-between">
//                             <p className="text-gray-200 text-xl font-semibold">Total</p>
//                             <p className="text-gray-200 text-xl font-semibold">
//                                 {tot + 2.5}
//                             </p>
//                         </div>

//                         {user ? (
//                             <motion.button
//                                 whileTap={{ scale: 0.8 }}
//                                 type="button"
//                                 className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
//                             >
//                                 Check Out
//                             </motion.button>
//                         ) : (
//                             <motion.button
//                                 whileTap={{ scale: 0.8 }}
//                                 type="button"
//                                 className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
//                             >
//                                 Login to check out
//                             </motion.button>
//                         )}
//                     </div>
//                 </div>
//             ) : (
//                 <div className="w-full h-full flex flex-col items-center justify-center gap-6">
//                     <img src={EmptyCart} className="w-300" alt="" />
//                     <p className="text-xl text-gray-500 font-semibold">
//                         Add some items to your cart
//                     </p>
//                 </div>
//             )}
//         </motion.div>
//     );
// };

// export default CartContainer;
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MdDelete,MdCompare } from "react-icons/md";
import { MobileContext } from "../context/MobileContext";
import {   useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";

const Card = ({ info,comp=false }) => {
    const nav = useNavigate();
    const {
        BASE_URL,
        addToWishList,
        wishList,
        addToCart,
        cart,
        user,
        compare,
        addToCompare,
        fetchFiltered, pageLimit,fetchBrandRam,
    } = useContext(MobileContext);
   

    const list1 = wishList?.map((item) => item._id).includes(info._id);
    const list2 = cart?.map((item) => item._id).includes(info._id);
    const list3 = compare?.map((item) => item._id).includes(info._id);
    const [isLiked, setIsLiked] = useState(false);
    const [inCart, setInCart] = useState(false);
    const [inCompare, setInCompare] = useState(false);

    useEffect(() => {
        setIsLiked(list1);
        setInCart(list2);
        setInCompare(list3);
      }, [list1, list2, list3]);


    async function likeHandler(e) {
        e.preventDefault()  
        if (isLiked) toast.error("Removed from wishlist");
        else toast.success("Added to wishlist");
        setIsLiked(!isLiked);

        //will add or remove from wishlist ( logic done at backend)
        addToWishList(info.key);
    }
    async function compareHandler(e) {
        e.preventDefault() 
        if (compare.length === 4 && !inCompare) {
            toast.error("You can compare only 4 items");
            return;
        }
        if (inCompare) toast.error("Removed from Comparison");
        else toast.success("Added to Comparision");
        setInCompare(!inCompare);

        //will add or remove from cart ( logic done at backend)
        addToCompare(info.key);
    }

    async function cartHandler(e) {
        e.preventDefault() 
        if (inCart) toast.error("Removed from Cart");
        else toast.success("Added to Cart");
        setInCart(!inCart);

        //will add or remove from cart ( logic done at backend)
        addToCart(info.key);
    }

    async function deleteMobile() {
        try { 
            await axios.delete(`${BASE_URL}/v1/mobiles/delete/${info.key}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
            fetchBrandRam();
            fetchFiltered(1, pageLimit);
        } catch (error) {
            if (error.response.status === 401) {
                nav("/login");
            }
            if (error.response.status === 403) {
                toast.error("Not Authorized");
            }
            if (error.response.status === 404) {
                toast.error("Mobile not found");
            }
        }
    } 

    const [colorClass, setColorClass] = useState("");

    useEffect(() => {
        setColorClass(getRandom());
    }, []);

    const getRandom = () => {
        const colors = [
            "text-purple-700 bg-purple-100",
            "text-red-700 bg-red-100",
            "text-yellow-700 bg-yellow-100",
            "text-blue-700 bg-blue-100",
            "text-indigo-700 bg-indigo-100",
            "text-pink-700 bg-pink-100",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className={`relative bg-white rounded-lg cursor-pointer shadow-md border-2 border-white overflow-hidden ${comp?`grid grid-cols-1 `:`flex`}  transition-shadow hover:shadow-lg hover:border-blue-500 flex-row justify-center w-full gap-8  px-4 max-sm:flex-wrap max-sm:text-sm`}>
            {user?.role === "Admin"&& !comp && (
                <div className="absolute top-3 right-4 flex flex-col items-center justify-center gap-2">
                    <div
                        className="p-1.5 rounded-2xl bg-gray-200 hover:scale-125 cursor-pointer transition-all duration-100 ease-in-out "
                        onClick={deleteMobile}
                    >
                        <MdDelete className=" text-xl  text-red-400 hover:text-red-500  " />
                    </div>
                </div>
            )}
            <div className={`${comp?'w-full relative p-4 flex justify-center items-center':'w-1/3 relative'}`}>
                <img src={info.mobImg} alt="mobile" className="w-[180px] pt-6   object-fit rounded-xl" />
                { inCart && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    In Cart
                  </div>
                )}
            </div> 
            <div className={`${comp?'w-full p-2' :'w-2/3 p-4 flex flex-col justify-between'}`}>
                <div className={`${comp?' flex justify-center items-center flex-col':''}`}>
                    <div className=" justify-center items-center gap-4 mb-2">
                        <h1 className="font-semibold text-2xl leading-wide ">
                            {info.mobName}
                        </h1>
 
                    </div>

                    <div className="mb-4 mt-2 flex justify-center items-baseline gap-2 w-fit">
                        <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${colorClass}`}
                        >
                            {info.brand}
                        </span>
                        <div className=" inline-flex justify-center items-center gap-0.5 bg-green-600 text-white font-bold text-sm px-1.5 rounded-md ">
                            {info.rating}
                            <FaStar className=" text-[10px] " />
                        </div>
                        <p className="text-sm text-gray-500 ">
                            ({info.review} reviews)
                        </p>
                    </div>
                   
                    <div className="pl-3 text-sm text-gray-600"> 
                        <p>• {info.chipset} Processor</p>
                        <p>• {info.display} inch Full HD+ display </p>
                        <p>• {info.ram}GB RAM</p>
                        <p>• {info.camera}MP Rear Cammera</p>
                        <p>
                            • {info.battery}mAh Battery ({info.batteryType})
                        </p>
                        <p>• {info.storage}</p> 
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-y-2 flex-wrap justify-between content-center">
                  <span className="text-xl font-bold text-gray-800">${info.price}</span>
                  <div className="space-x-2 flex flex-wrap justify-center items-center">
                    <button 
                      type="button" 
                      onClick={(e)=> likeHandler(e)}
                      className={`p-3 rounded-full ${ isLiked ? 'bg-red-100 text-red-500' : 'text-gray-400 hover:bg-gray-100'}`}
                      aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {isLiked ? <FaHeart className="h-5 w-5" /> : <FaRegHeart className="h-5 w-5" />}
                    </button>
                    <button  
                      onClick={(e)=> cartHandler(e)}
                      className={`p-3 rounded-full ${inCart ? 'bg-green-100 text-green-500' : 'text-gray-400 hover:bg-gray-100'}`}
                      aria-label={inCart ? "Remove from cart" : "Add to cart"}
                    >
                      {inCart ? <IoCart className="h-5 w-5" /> : <IoCartOutline className="h-5 w-5" />}
                    </button>
                    <button  
                      onClick={(e)=> compareHandler(e)}
                      className={`p-3 rounded-full ${inCompare ? 'bg-blue-100 text-blue-500' : 'text-gray-400 hover:bg-gray-100'}`}
                      aria-label={inCompare ? "Remove from compare" : "Add to compare"}
                    >
                      {inCompare ? <MdCompare className="h-5 w-5" /> : <MdCompare className="h-5 w-5" />}
                    </button>
                    </div>
                </div>
            </div>
 
        </div>
    );
};

export default Card;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MobileContext } from "../context/MobileContext";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";

const Card = ({ info }) => {
    const nav = useNavigate();
    const {
        BASE_URL,
        addToWishList,
        wishList,
        addToCart,
        cart,
        fetchAllMobiles,
    } = useContext(MobileContext);

    const list1 = wishList?.map((item) => item._id).includes(info._id);
    const list2 = cart?.map((item) => item._id).includes(info._id);
    const [isLiked, setIsLiked] = useState(list1);
    const [inCart, setInCart] = useState(list2);
    const user = JSON.parse(sessionStorage.getItem("user")) || null;

    async function likeHandler() {
        if (isLiked) toast.error("Removed from wishlist");
        else toast.success("Added to wishlist");
        setIsLiked(!isLiked);
        //will add or remove from wishlist
        addToWishList(info.key);
    }

    async function cartHandler() {
        if (inCart) toast.error("Removed from Cart");
        else toast.success("Added to Cart");
        setInCart(!inCart);

        //will add or remove from cart
        addToCart(info.key);
    }

    async function deleteMobile() {
        try { 
            await axios.delete(`${BASE_URL}/mobiles/delete/${info.key}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
            fetchAllMobiles();
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
            // 'text-green-700 bg-green-100',
            "text-blue-700 bg-blue-100",
            "text-indigo-700 bg-indigo-100",
            "text-pink-700 bg-pink-100",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="relative bg-white rounded-lg cursor-pointer shadow-md border-2 border-white overflow-hidden flex transition-shadow hover:shadow-lg hover:border-blue-500 flex-row justify-center w-full gap-8  px-4 max-sm:flex-wrap max-sm:text-sm">
            {user?.role === "Admin" && (
                <div className="absolute top-3 right-4 flex flex-col items-center justify-center gap-2">
                    <div
                        className="p-1.5 rounded-2xl bg-gray-200 hover:scale-125 cursor-pointer transition-all duration-100 ease-in-out "
                        onClick={deleteMobile}
                    >
                        <MdDelete className=" text-xl  text-red-400 hover:text-red-500  " />
                    </div>
                </div>
            )}
            <div className="w-1/3 relative">
                <img src={info.mobImg} alt="mobile" className="w-[180px] pt-6   object-fit rounded-xl" />
                { inCart && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    In Cart
                  </div>
                )}
            </div> 
            <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
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

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-800">${info.price}</span>
                  <div className="space-x-2">
                    <button  
                      onClick={likeHandler}
                      className={`p-2 rounded-full ${ isLiked ? 'bg-red-100 text-red-500' : 'text-gray-400 hover:bg-gray-100'}`}
                      aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {isLiked ? <FaHeart className="h-5 w-5" /> : <FaRegHeart className="h-5 w-5" />}
                    </button>
                    <button  
                      onClick={cartHandler}
                      className={`p-2 rounded-full ${inCart ? 'bg-green-100 text-green-500' : 'text-gray-400 hover:bg-gray-100'}`}
                      aria-label={inCart ? "Remove from cart" : "Add to cart"}
                    >
                      {inCart ? <IoCart className="h-5 w-5" /> : <IoCartOutline className="h-5 w-5" />}
                    </button>
                    </div>
                </div>
            </div>
 
        </div>
    );
};

export default Card;

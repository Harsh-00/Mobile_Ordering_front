import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MobileContext } from "../context/MobileContext";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartDislike } from "react-icons/io";

const Card = ({ info }) => {
	const { BASE_URL, addToWishList, wishList, addToCart, cart } =
		useContext(MobileContext);

	const list1 = wishList?.map((item) => item._id).includes(info._id);
	const list2 = cart?.map((item) => item._id).includes(info._id);
	const [isLiked, setIsLiked] = useState(list1);
	const [inCart, setInCart] = useState(list2);

	async function likeHandler() {
		setIsLiked(!isLiked);
		//will add or remove from wishlist
		addToWishList(info.key);
	}

	async function cartHandler() {
		setInCart(!inCart);

		//will add or remove from cart
		addToCart(info.key);
	}

	async function deleteMobile() {
		console.log(info.key);
		await axios.delete(`${BASE_URL}/mobiles/delete/${info.key}`, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
			},
		});
	}

	return (
		<div className="relative flex flex-row w-full gap-8 border-b-2 border-gray-400 p-4 max-sm:flex-wrap">
			<div className="absolute -top-3 right-4 flex flex-col items-center justify-center gap-2">
				<div
					className="p-1.5 rounded-2xl bg-gray-200 hover:scale-125 cursor-pointer transition-all duration-100 ease-in-out "
					onClick={deleteMobile}
				>
					<MdDelete className=" text-xl  text-red-400 hover:text-red-500  " />
				</div>

				<div
					className="p-1.5 rounded-2xl bg-gray-200 hover:scale-125 cursor-pointer transition-all duration-100 ease-in-out "
					onClick={likeHandler}
				>
					{isLiked ? (
						<IoMdHeart className=" text-xl text-red-500 " />
					) : (
						<IoMdHeart className=" text-xl text-white " />
					)}
				</div>
			</div>
			<div className="w-[160px] h-[215px] shrink-0 mb-4 ">
				<img
					src={info.mobImg}
					alt="image of mobile"
					className="w-full object-cover h-full rounded-xl"
				/>
			</div>
			<div className=" flex-grow max-w-[600px]">
				<div className="inline-flex justify-center items-center gap-4 mb-2">
					<h1 className="font-semibold text-2xl leading-wide ">
						{info.mobName}
					</h1>
					<div className="bg-green-500 w-fit px-2 text-white font-bold text-sm rounded-xl h-6 ">
						{info.brand}
					</div>
				</div>

				<div className="pl-3">
					<p>
						• {info.ram}GB RAM | {info.osType} OS
					</p>
					<p>• {info.camera}MP Rear Cammera</p>
					<p>• {info.display} inch Full HD+ display </p>
					<p>• {info.chipset} Processor</p>
					<p>
						• {info.battery}mAh Battery ({info.batteryType})
					</p>
					<p>• {info.storage}</p>
					<p>• Releasing Date: {info.relasingDate}</p>
				</div>
			</div>
			<div className="mr-4">
				<p className="font-semibold text-xl whitespace-nowrap">
					Price: ${info.price}
				</p>
				<div
					className="bg-green-500 text-white font-semibold text-lg rounded-xl w-fit px-3 py-0.5 mt-3 whitespace-nowrap cursor-pointer "
					onClick={cartHandler}
				>
					Add to Cart
				</div>
			</div>
		</div>
	);
};

export default Card;

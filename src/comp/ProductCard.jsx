import axios from "axios";
import React, { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MobileContext } from "../context/MobileContext";
import { IoMdHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";

import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import {
    Image,
    Stack,
    Heading,
    Text,
    Divider,
    ButtonGroup,
    Button,
} from "@chakra-ui/react";

const ProductCard = ({ info }) => {
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
            // console.log(info.key);
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

    return(
		<Card maxW='2xl'>
			<CardBody className="flex">
				<div className="w-[180px] h-[250px] shrink-0 mb-4 ">
					<img
						src={info.mobImg}
						alt="image of mobile"
						className="w-full  h-full rounded-xl"
					/>
				</div>
				<Stack mt="6" spacing="3">
					<Heading size="md">Living room Sofa</Heading>
					<Text>
						This sofa is perfect for modern tropical spaces, baroque
						inspired spaces, earthy toned spaces and for people who love
						a chic design with a sprinkle of vintage design.
					</Text>
					<Text color="blue.600" fontSize="2xl">
						$450
					</Text>
				</Stack>
			</CardBody>
			<Divider />
			<CardFooter>
				<ButtonGroup spacing="2">
					<Button variant="solid" colorScheme="blue">
						Buy now
					</Button>
					<Button variant="ghost" colorScheme="blue">
						Add to cart
					</Button>
				</ButtonGroup>
			</CardFooter>
		</Card>
	);

    // return (
    //     <div className="relative flex flex-row w-full gap-8 border-b border-gray-400 p-4 max-sm:flex-wrap">
    //         <div className="absolute top-3 right-4 flex flex-col items-center justify-center gap-2">
    //             <div
    //                 className="p-1.5 rounded-2xl bg-gray-200 hover:scale-125 cursor-pointer transition-all duration-100 ease-in-out "
    //                 onClick={deleteMobile}
    //             >
    //                 <MdDelete className=" text-xl  text-red-400 hover:text-red-500  " />
    //             </div>
    //         </div>
    //         <div className="w-[160px] h-[215px] shrink-0 mb-4 ">
    //             <img
    //                 src={info.mobImg}
    //                 alt="image of mobile"
    //                 className="w-full object-cover h-full rounded-xl"
    //             />
    //         </div>
    //         <div className=" flex-grow max-w-[600px]">
    //             <div className="inline-flex justify-center items-center gap-4 mb-2">
    //                 <h1 className="font-semibold text-2xl leading-wide ">
    //                     {info.mobName}
    //                 </h1>
    //                 <div className="bg-green-500 w-fit px-2 text-white font-bold text-sm rounded-xl h-6 ">
    //                     {info.brand}
    //                 </div>
    //             </div>

    //             <div className="pl-3">
    //                 <p>
    //                     • {info.ram}GB RAM | {info.osType} OS
    //                 </p>
    //                 <p>• {info.camera}MP Rear Cammera</p>
    //                 <p>• {info.display} inch Full HD+ display </p>
    //                 <p>• {info.chipset} Processor</p>
    //                 <p>
    //                     • {info.battery}mAh Battery ({info.batteryType})
    //                 </p>
    //                 <p>• {info.storage}</p>
    //                 <p>• Releasing Date: {info.relasingDate}</p>
    //             </div>
    //         </div>
    //         <div className="mr-4">
    //             <p className="font-semibold text-xl whitespace-nowrap">
    //                 Price: ${info.price}
    //             </p>

    //             <div
    //                 className={`${
    //                     inCart ? "bg-red-500" : "bg-green-500"
    //                 } text-white font-semibold rounded-xl w-fit px-3 py-0.5 mt-3 whitespace-nowrap cursor-pointer flex justify-center items-center gap-2`}
    //                 onClick={cartHandler}
    //             >
    //                 {inCart ? "Remove from " : "Add to "}
    //                 <FaShoppingCart className="text-xl" />
    //             </div>

    //             <div
    //                 className={`${
    //                     isLiked ? "bg-red-500" : "bg-green-500"
    //                 } text-white font-semibold rounded-xl w-fit px-3 py-0.5 mt-3 whitespace-nowrap cursor-pointer flex justify-center items-center gap-2`}
    //                 onClick={likeHandler}
    //             >
    //                 {isLiked ? "Remove from " : "Add to "}
    //                 <IoMdHeart className=" text-xl" />
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default ProductCard;

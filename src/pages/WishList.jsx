import React, { useContext, useEffect } from "react";
import { MobileContext } from "../context/MobileContext";
import empty from "../assets/empty.svg";
import Card from "../comp/Card";

const WishList = () => {
	const { getWishList, wishList } = useContext(MobileContext);

	useEffect(() => {
		getWishList();
	}, [getWishList]); 
	
	return (
		<div className="max-w-5xl mx-auto flex flex-col gap-6 py-4 pb-10">
		<div className="mx-auto text-3xl font-semibold leading-6 py-6 pb-10 text-gray-800 underline">
                Wishlist
            </div>
			{wishList?.length === 0 && (
				<div className="flex flex-col justify-center items-center gap-6 mt-24">
					<img
						src={empty}
						alt="empty"
						className=" w-[300px] mx-auto"
					/>
					<p className="text-4xl opacity-20 font-semibold">
						No Data Found
					</p>
				</div>
			)}
			{wishList?.map((item) => {
				return <Card key={item.key} info={item} />;
			})}
		</div>
	);
};

export default WishList;

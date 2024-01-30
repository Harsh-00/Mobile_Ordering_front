import React, { useContext, useEffect, useState } from "react";
import { MobileContext } from "../context/MobileContext";
import empty from "../assets/empty.svg";
import Card from "../comp/Card";

const WishList = () => {
	const { getWishList, wishList } = useContext(MobileContext);

	useEffect(() => {
		getWishList();
	}, []);
	console.log(wishList);
	return (
		<div className="max-w-5xl mx-auto flex flex-col gap-6 pt-4">
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

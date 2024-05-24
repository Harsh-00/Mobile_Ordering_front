import React, { useContext, useEffect, useState } from "react";
import { MobileContext } from "../context/MobileContext";
import ProductCard from "../comp/ProductCard";
import empty from "../assets/empty.svg";

const Cart = () => {
	const { getCart, cart } = useContext(MobileContext);

	useEffect(() => {
		getCart();
	}, []);
	return (
		<div className="max-w-5xl mx-auto flex flex-col gap-6 pt-4">
			{cart?.length === 0 && (
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
			{cart?.map((item) => {
				return <ProductCard key={item.key} info={item} />;
			})}
		</div>
	);
};

export default Cart;

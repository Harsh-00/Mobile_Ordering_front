import React, { useContext, useEffect, useState } from "react";
import { MobileContext } from "../context/MobileContext";
import Card from "../comp/Card";
import axios from "axios";

const WishList = () => {
	const { getWishList, wishList } = useContext(MobileContext);

	useEffect(() => {
		getWishList();
	}, []);
	return (
		<div className="max-w-5xl mx-auto flex flex-col gap-6 pt-4">
			{wishList?.map((item) => {
				return <Card key={item.key} info={item} />;
			})}
		</div>
	);
};

export default WishList;

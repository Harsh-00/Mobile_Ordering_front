import React, { useContext, useEffect, useState } from "react";
import { MobileContext } from "../context/MobileContext";
import Card from "../comp/Card";

const Cart = () => {
	const { getCart, cart } = useContext(MobileContext);

	useEffect(() => {
		getCart();
	}, []);
	return (
		<div>
			{cart?.map((item) => {
				return <Card key={item.key} info={item} />;
			})}
		</div>
	);
};

export default Cart;

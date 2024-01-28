import React, { useContext, useEffect, useState } from "react";
import { MobileContext } from "../context/MobileContext";
import Card from "../comp/Card";
import axios from "axios";

const WishList = () => {
	const [list, setList] = useState([]);
	const { BASE_URL } = useContext(MobileContext);
	
	console.log(list);
	useEffect(() => {
		async function getWishList() {
			const res = await axios.get(`${BASE_URL}/mobiles/wishlist`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			console.log(res);
			setList(res.data.list);
		}
		getWishList();
	}, []);
	return (
		<div>
			{list.map((item) => {
				return <Card key={item.key} info={item} />;
			})}
		</div>
	);
};

export default WishList;

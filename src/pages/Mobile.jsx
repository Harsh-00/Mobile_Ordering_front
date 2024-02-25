import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../comp/Sidebar";
import { MobileContext } from "../context/MobileContext";
import Loader from "../comp/Loader";

import Card from "../comp/Card";
import { useNavigate } from "react-router-dom";

const Mobile = () => {
	const nav = useNavigate();
	const { allMob, fetchAllMobiles, loading, getWishList, getCart } =
		useContext(MobileContext);
	console.log(allMob);

	useEffect(() => {
		if (!window.sessionStorage.getItem("token")) {
			return nav("/login");
		}
		fetchAllMobiles();
	}, []);

	return (
		<div className="flex w-full h-full bg-[#f0f2f5] gap-3 max-md:flex-col ">
			<div className="bg-white ml-3  mb-6 h-screen w-[300px] shadow-xl mt-4 max-md:h-auto max-md:w-full">
				<Sidebar info={allMob} />
			</div>
			<div className="relative bg-white h-full w-full min-h-screen flex-grow flex flex-col gap-8 p-4 pb-10 mb-6 shadow-xl mr-3 pt-6 mt-4 max-md:mr-2  max-md:ml-2  ">
				{loading ? (
					<Loader />
				) : (
					allMob.map((item) => {
						return <Card key={item.key} info={item} />;
					})
				)}
			</div>
		</div>
	);
};

export default Mobile;

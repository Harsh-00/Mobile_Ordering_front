import React from "react";
import image from "../assets/building-website.svg";

const Home = () => {
	return (
		<div className="bg-gray-200 w-full h-full min-h-screen flex justify-center items-center flex-col gap-16">
			<img src={image} className="w-[400px]"></img>
			<h1 className="font-semibold text-3xl ">
				This Page is Under Construction
			</h1>
			<p>(Move to Mobiles Section)</p>
		</div>
	);
};

export default Home;

import React from "react";
import page from "../assets/page not found.svg";

const Error = () => {
	return (
		<div className="">
			<img
				src={page}
				alt="page not found"
				className="w-[650px] mx-auto mt-20"
			/>
		</div>
	);
};

export default Error;

import React from "react";

const Card = ({ info }) => {
	return (
		<div className="flex flex-row w-full gap-8 border-b-2 border-gray-400 p-4">
			<div className="w-[160px] h-[215px] shrink-0 mb-4">
				<img
					src={info.mobImg}
					alt="image of mobile"
					className="w-full object-cover h-full rounded-xl"
				/>
			</div>
			<div className=" flex-grow max-w-[600px]">
				<div className="inline-flex justify-center items-center gap-4 mb-2">
					<h1 className="font-semibold text-2xl leading-wide ">
						{info.mobName}
					</h1>
					<div className="bg-green-500 w-fit px-2 text-white font-bold text-sm rounded-xl h-6 ">
						{info.brand}
					</div>
				</div>

				<div className="pl-3">
					<p>
						• {info.ram}GB RAM | {info.osType} OS
					</p>
					<p>• {info.camera}MP Rear Cammera</p>
					<p>• {info.display} inch Full HD+ display </p>
					<p>• {info.chipset} Processor</p>
					<p>
						• {info.battery}mAh Battery ({info.batteryType})
					</p>
					<p>• {info.storage}</p>
					<p>• Releasing Date: {info.relasingDate}</p>
				</div>
			</div>
			<div className="mr-4">
				<p className="font-semibold text-xl whitespace-nowrap">
					Price: ${info.price}
				</p>
				<div className="bg-green-500 text-white font-semibold text-lg rounded-xl w-fit px-3 py-0.5 mt-3 whitespace-nowrap  cursor-not-allowed">
					Buy Now
				</div>
			</div>
		</div>
	);
};

export default Card;

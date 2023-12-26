import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../comp/Sidebar";
import { MobileContext } from "../context/MobileContext";

import Card from "../comp/Card";

const Mobile = () => {
	const { allMob, fetchAllMobiles } = useContext(MobileContext);
	console.log(allMob);

	useEffect(() => {
		fetchAllMobiles();
	}, []);

	return (
		<div className="flex w-full h-full">
			<div className="bg-slate-200 min-h-screen w-[300px]">
				<Sidebar info={allMob} />
			</div>
			<div className="bg-blue-100 h-full w-full min-h-screen flex-grow flex flex-col gap-8 p-4 pb-10 mb-2">
				{allMob.map((item) => {
					return <Card key={item.key} info={item} />;
				})}
			</div>
		</div>
	);
};

export default Mobile;

import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../comp/Sidebar";
import { MobileContext } from "../context/MobileContext";
import Loader from "../comp/Loader";

import ProductCard from "../comp/ProductCard";
import { useNavigate } from "react-router-dom";
import LeftDrawer from "../comp/LeftDrawer";

// import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
// import { Image,Stack,Heading,Text,Divider,ButtonGroup, Button } from "@chakra-ui/react";

const Mobile = () => {
	const nav = useNavigate();
	const { allMob, fetchAllMobiles, loading, getWishList, getCart } =
		useContext(MobileContext);
	// console.log(allMob);
	
	useEffect(() => {
		if (!window.sessionStorage.getItem("token")) {
			return nav("/login");
		}
		fetchAllMobiles();
	}, []);

	return (
        <div className="flex flex-col w-full h-full bg-[#f0f2f5] gap-1 max-md:flex-col ">
            <LeftDrawer />
            {/* <div className="bg-white ml-3  mb-6 h-screen w-[300px] shadow-xl mt-4 max-md:h-auto max-md:w-full">
				<Sidebar info={allMob} />
			</div> */}
            <div className="relative bg-white h-full w-full min-h-screen flex-grow grid grid-cols-2 gap-6 p-4 pb-10 mb-6 shadow-xl mr-3 pt-6 mt-4 max-md:mr-2  max-md:ml-2  ">
                {loading ? (
                    <Loader />
                ) : (
                    allMob.map((item) => {
                        return <ProductCard key={item.key} info={item} />;
                    })
                )}
            </div>
        </div>
    );
};

export default Mobile;



import React, { useContext, useEffect } from "react";
import { MobileContext } from "../context/MobileContext";
import Loader from "../comp/Loader";

import Card from "../comp/Card";
import { useNavigate } from "react-router-dom";
import Filterbar from "../comp/Filterbar";


const Mobile = () => {
    const nav = useNavigate();

    const { allMob,user, fetchAllMobiles, loading,getCart,getWishList,getCompare, setNavMenu } =
        useContext(MobileContext);
    
    

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => { 
        if (!user) {
            return nav("/login");
        }
        else{
            fetchAllMobiles();
			getCart();
			getWishList();
			getCompare();
        }
        
    }, [user]);
    /* eslint-enable react-hooks/exhaustive-deps */

    return (
        <div
            className="relative flex flex-col w-full h-full min-h-screen bg-[#f0f2f5]  max-md:flex-col"
            onClick={() => setNavMenu(false)}
        >
            <div className="   h-fit w-full mx-auto px-4   mt-4 max-md:h-auto max-md:w-full">
                {/* <Sidebar info={allMob} /> */}
                <Filterbar info={allMob} />
            </div>

            {loading ? (
                <div className="min-h-screen">
                    <Loader />
                </div>
            ) : (
                <div className="relative   h-full w-full   grid grid-cols-2 gap-8 p-4 pb-10 mb-6   mr-3 pt-6 mt-4 max-md:mr-2  max-md:ml-2 max-lg:grid-cols-1  ">
                    {allMob.map((item) => {
                        return <Card key={item.key} info={item} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default Mobile;

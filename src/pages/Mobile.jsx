import React, { useContext, useEffect } from "react";
import { MobileContext } from "../context/MobileContext";
import Loader from "../comp/Loader";

import Card from "../comp/Card";
import { Link, useNavigate } from "react-router-dom";
import Filterbar from "../comp/Filterbar";
import empty from "../assets/empty.svg";
import Pagination from "./Pagination";

const Mobile = () => {
    const nav = useNavigate();

    const {
        allMob,
        user,
        loading,
        setNavMenu,
        fetchFiltered,pageLimit,
        totalItems,fetchBrandRam,
    } = useContext(MobileContext);

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (!user) {
            return nav("/login");
        } else {
            fetchBrandRam();
            fetchFiltered(1, pageLimit);
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
            ) : totalItems === 0 ? (
                <div className=" flex flex-col items-center justify-center h-full w-full mt-28">
                    <img
                        src={empty}
                        alt="empty"
                        className=" w-[300px] mx-auto"
                    />
                    <p className="text-4xl opacity-20 font-semibold">
                        No Data Found
                    </p>
                    <div className="absolute bottom-0 w-full">
                        <Pagination />
                    </div>
                </div>
            ) : (
                <div className=" mb-20 ">
                
                    <div className="relative   h-full w-full   grid grid-cols-2 gap-8 p-4 pb-6 mb-2   mr-3 pt-6 mt-4 max-md:mr-2  max-md:ml-2 max-lg:grid-cols-1  ">
                        {allMob.map((item) => {
                            return (
                                <Link
                                    to={`/mobiles/${item.key}`}
                                    key={item.key}
                                >
                                    <Card info={item} />
                                </Link>
                            );
                        })}
                    </div>
                    <div className="absolute bottom-0 w-full">
                        <Pagination />
                    </div>
                </div>
            )}
        </div>
    );
};
export default Mobile;

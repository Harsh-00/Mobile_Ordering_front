import React, { useContext, useEffect } from "react";
import { MobileContext } from "../context/MobileContext";
import Card from "../comp/Card";
import empty from "../assets/empty.svg";

const Compare = () => {
    const { compare, getCompare } = useContext(MobileContext);

    useEffect(() => { 
        getCompare();
    }, [getCompare]);

    return (
        <div>
            <div className="mx-auto w-full text-center text-3xl font-semibold leading-6 pb-2 text-gray-800 underline mt-6">
                    Compare
                </div>
            {compare?.length === 0 ? (
                <div className="flex flex-col justify-center items-center gap-6 my-28">
                    <img
                        src={empty}
                        alt="empty"
                        className=" w-[300px] mx-auto"
                    />
                    <p className="text-4xl opacity-20 font-semibold">
                        No Data Found
                    </p>
                </div>
            ) : (
                <div
                    className={`grid grid-cols-${
                        compare.length > 1 ? compare.length : 1
                    } justify-center gap-4 my-6 px-4`}
                >
                    {compare.map((item) => {
                        return <Card key={item.key} info={item} comp={true} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default Compare;

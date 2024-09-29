import { useContext, useEffect } from "react";
import moment from "moment";
import { MobileContext } from "../context/MobileContext";

import empty from "../assets/empty.svg";

const statuses = {
    Complete: "text-green-700 bg-green-50 ring-green-600/20", 
    Pending: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
    Failed: "text-red-800 bg-red-50 ring-red-600/20",
};

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Orders() {
    const { orderHistoryUser, orders } = useContext(MobileContext);
    
    useEffect(() => {
        orderHistoryUser();
    }, []);

    console.log(orders);
    return (
        <div className="max-w-5xl mx-auto flex flex-col gap-10 pt-4 mb-8">
            <div className="mx-auto text-3xl font-semibold leading-6 py-6 text-gray-800 underline">
                Order History
            </div>

            {orders?.length === 0 && (
				<div className="flex flex-col justify-center items-center gap-6 mt-24">
					<img
						src={empty}
						alt="empty"
						className=" w-[300px] mx-auto"
					/>
					<p className="text-4xl opacity-20 font-semibold">
						No Data Found
					</p>
				</div>
			)}

            <ul className="divide-y-2 flex flex-col gap-6 divide-gray-100 ">
                {orders.map((project) => (
                    <li key={project._id}>
                        <div className="flex items-start justify-between gap-x-4 py-1">
                            <div className="min-w-0 mb-2">
                                <div className="flex items-start gap-x-3">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        Order : #{project._id}
                                    </p>
                                    <p
                                        className={classNames(
                                            statuses[project.status],
                                            "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                                        )}
                                    >
                                        {project.status}
                                    </p>
                                    
                                </div>
                                <div className=" flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                    <p className="whitespace-nowrap">
                                    
                                        Placed on : {moment(project.createdAt).format("MMM Do YYYY, h:mm a")}
                                    </p>
                                     
                                </div>
                                <div className="grid grid-cols-3 gap-x-10 gap-y-4 flex-wrap mt-3 pl-6">
                                {project.products.map((product) => (
                                    <div className="flex gap-x-2 mt-1">
                                        <img
                                            src={product.mobImg}
                                            alt=""
                                            className="h-16 w-14 rounded-md"
                                        />
                                        <div>
                                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                                {product.mobName}
                                            </p>
                                            <p className="text-xs text-gray-500 mb-0.5">
                                                Brand: {product.brand}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Price: ${product.price}
                                            </p>
                                            
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                            <div className="flex flex-none items-center gap-x-4">
                                <div className=" text-xl font-semibold leading-6 text-gray-900">
                                      ${project.totalAmount}
                                    <span className="sr-only">
                                        , {project.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

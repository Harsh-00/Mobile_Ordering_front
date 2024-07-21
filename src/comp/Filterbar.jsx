import React from "react";
import { MdFilterListAlt } from "react-icons/md";

const Filterbar = () => {
    return (
        <div>
            <div className="relative w-full py-4 flex justify-between">
                <div className=" flex space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
                    <div>
                        <div className="group flex items-center font-medium text-gray-700">
                            <MdFilterListAlt
                                className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                            />
                            2 Filters
                        </div>
                    </div>
                    <div className="pl-6">
                        <button type="button" className="text-gray-500">
                            Clear all
                        </button>
                    </div>
                </div>

                {/* <div className="mr-10">Sort</div> */}
            </div>
        </div>
    );
};

export default Filterbar;

import React, { useContext, useEffect } from "react";
import { MdFilterListAlt } from "react-icons/md";
import { MobileContext } from "../context/MobileContext";

import { FaStar } from "react-icons/fa6";

const Filterbar = () => {
    const {
		AllFilters, setAllFilters,brandFilter,
		setBrandFilter,priceFilter,
		setPriceFilter,
		ramFil,price, setPrice,
		setRamFil,brand,setBrand,ram,setRam,
		fetchFilteredd,rating, setRating,ratingFilter, setRatingFilter
	} = useContext(MobileContext);


    useEffect(() => {
		fetchFilteredd();
	}, [brandFilter, ramFil, priceFilter,ratingFilter]);

	function brandHandler(e) {
		if (e.target.checked) {
			setBrandFilter([...brandFilter, e.target.value]);
		} else {
			setBrandFilter(brandFilter.filter((item) => item !== e.target.value));
		}
	}

	function ramHandler(e) {
		if (e.target.checked) {
			setRamFil([...ramFil, e.target.value]);
		} else {
			setRamFil(ramFil.filter((item) => item !== e.target.value));
		}
	}

    function priceHandler(e) {
        if (e.target.checked) {
            setPriceFilter([...priceFilter, e.target.value]);
        } else {
            setPriceFilter(priceFilter.filter((item) => item !== e.target.value));
        }
    }

    function ratingHandler(e) {
        if (e.target.checked) {
            setRatingFilter([...ratingFilter, e.target.value]);
        } else {
            setRatingFilter(ratingFilter.filter((item) => item !== e.target.value));
        }
    }
      
      
      const sortOptions = [
        { name: 'Most Popular', href: '#', current: true },
        { name: 'Best Rating', href: '#', current: false },
        { name: 'Newest', href: '#', current: false },
      ]
      
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

            {/* panel */}

            <div className="border-t border-gray-200 py-10">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
                    <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                        <fieldset>
                            <legend className="block font-medium">Brand</legend>
                            <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                {brand?.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center text-base sm:text-sm"
                                    >
                                        <input
                                            type="checkbox"
                                            name="Brand"
                                            className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            value={item}
                                            id={`brand-${idx}`}
                                            onChange={brandHandler}
                                            // onChange={filterHandler}
                                        />
                                        <label
                                            htmlFor={`brand-${idx}`}
                                            className="ml-3 min-w-0 flex-1 text-gray-600"
                                        >
                                            {item}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend className="block font-medium">Ram</legend>
                            <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                {ram?.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center text-base sm:text-sm"
                                    >
                                        <input
                                            type="checkbox"
                                            name="Ram"
                                            className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            value={item}
                                            id={`ram-${idx}`}
                                            onChange={ramHandler}
                                            // onChange={filterHandler}
                                        />
                                        <label
                                            htmlFor={`ram-${idx}`}
                                            className="ml-3 min-w-0 flex-1 text-gray-600"
                                        >
                                            {item} GB
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                    </div>
                    <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                        <fieldset>
                            <legend className="block font-medium">Price</legend>
                            <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                {price?.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center text-base sm:text-sm"
                                    >
                                        <input
                                            type="checkbox"
                                            name="Price"
                                            className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            value={item.value}
                                            id={`price-${idx}`}
                                            onChange={priceHandler}
                                        />
                                        <label
                                            htmlFor={`price-${idx}`}
                                            className="ml-3 min-w-0 flex-1 text-gray-600"
                                        >
                                            {item.name} 
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend className="block font-medium">Rating</legend>
                            <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                {rating?.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center text-base sm:text-sm"
                                    >
                                        <input
                                            type="checkbox"
                                            name="Rating"
                                            className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            value={item.value}
                                            id={`rating-${idx}`}
                                            onChange={ratingHandler}
                                        />
                                        <label
                                            htmlFor={`rating-${idx}`}
                                            className="ml-3 min-w-0 flex-1 text-gray-600 flex items-center gap-1"
                                        >
                                            {item.name} 
                                            <FaStar className="h-4.5 w-4.5 text-yellow-400" />
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filterbar;

import React, { useContext, useEffect } from "react";
import { MdFilterListAlt } from "react-icons/md";
import { MobileContext } from "../context/MobileContext";

const Filterbar = () => {
    const {
		AllFilters, setAllFilters,brandFilter,
		setBrandFilter,
		ramFil,
		setRamFil,brand,setBrand,ram,setRam,
		fetchFilteredd,count,setCount
	} = useContext(MobileContext);

    

    useEffect(() => {
		fetchFilteredd();
	}, [brandFilter, ramFil]);

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
      
      

    const filters = {
        price: [
          { value: '0', label: '$0 - $25', checked: false },
          { value: '25', label: '$25 - $50', checked: false },
          { value: '50', label: '$50 - $75', checked: false },
          { value: '75', label: '$75+', checked: false },
        ],
        color: [
          { value: 'white', label: 'White', checked: false },
          { value: 'beige', label: 'Beige', checked: false },
          { value: 'blue', label: 'Blue', checked: true },
          { value: 'brown', label: 'Brown', checked: false },
          { value: 'green', label: 'Green', checked: false },
          { value: 'purple', label: 'Purple', checked: false },
        ],
        size: [
          { value: 'xs', label: 'XS', checked: false },
          { value: 's', label: 'S', checked: true },
          { value: 'm', label: 'M', checked: false },
          { value: 'l', label: 'L', checked: false },
          { value: 'xl', label: 'XL', checked: false },
          { value: '2xl', label: '2XL', checked: false },
        ],
        category: [
          { value: 'all-new-arrivals', label: 'All New Arrivals', checked: false },
          { value: 'tees', label: 'Tees', checked: false },
          { value: 'objects', label: 'Objects', checked: false },
          { value: 'sweatshirts', label: 'Sweatshirts', checked: false },
          { value: 'pants-and-shorts', label: 'Pants & Shorts', checked: false },
        ],
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
                                            id={idx}
                                            onChange={brandHandler}
                                            // onChange={filterHandler}
                                        />
                                        <label
                                            htmlFor={idx}
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
                                            id={idx}
                                            onChange={ramHandler}
                                            // onChange={filterHandler}
                                        />
                                        <label
                                            htmlFor={idx}
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
                            <legend className="block font-medium">Size</legend>
                            <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                {filters.size.map((option, optionIdx) => (
                                    <div
                                        key={option.value}
                                        className="flex items-center text-base sm:text-sm"
                                    >
                                        <input
                                            id={`size-${optionIdx}`}
                                            name="size[]"
                                            defaultValue={option.value}
                                            type="checkbox"
                                            className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            defaultChecked={option.checked}
                                        />
                                        <label
                                            htmlFor={`size-${optionIdx}`}
                                            className="ml-3 min-w-0 flex-1 text-gray-600"
                                        >
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend className="block font-medium">
                                Category
                            </legend>
                            <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                {filters.category.map((option, optionIdx) => (
                                    <div
                                        key={option.value}
                                        className="flex items-center text-base sm:text-sm"
                                    >
                                        <input
                                            id={`category-${optionIdx}`}
                                            name="category[]"
                                            defaultValue={option.value}
                                            type="checkbox"
                                            className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            defaultChecked={option.checked}
                                        />
                                        <label
                                            htmlFor={`category-${optionIdx}`}
                                            className="ml-3 min-w-0 flex-1 text-gray-600"
                                        >
                                            {option.label}
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

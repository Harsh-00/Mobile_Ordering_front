import React, { useContext, useEffect, useRef, useState } from "react";
import { MdFilterListAlt } from "react-icons/md";
import { MobileContext } from "../context/MobileContext";
import { FaStar } from "react-icons/fa6";
import { Navigate } from "react-router-dom"; 

const Filterbar = () => {
    const {
        brandFilter,
        setBrandFilter,
        priceFilter,
        setPriceFilter,
        ramFil,
        price,
        setRamFil,
        brand,
        ram,
        filterCount,
        setFilterCount,
        fetchFiltered,
        rating,
        ratingFilter,
        setRatingFilter,
        clearFilters, 
        sortBy,setSortBy,
		sortOrder,setSortOrder,
        user,
        setCurrPage
    } = useContext(MobileContext);
    const ref = useRef();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (!user) return <Navigate to="/login" />;
        setFilterCount(
            brandFilter.length +
                ramFil.length +
                priceFilter.length +
                ratingFilter.length
        );
        setCurrPage(1);
        fetchFiltered();
    }, [user,brandFilter, ramFil, priceFilter, ratingFilter, setFilterCount,sortBy,sortOrder]);

    /* eslint-enable react-hooks/exhaustive-deps */
 
    const [sortPanel, setSortPanel] = useState(false);
    const [brandPanel, setBrandPanel] = useState(false);
    const [ramPanel, setRamPanel] = useState(false);
    const [pricePanel, setPricePanel] = useState(false);
    const [ratingPanel, setRatingPanel] = useState(false);

    function brandHandler(e) {
        if (e.target.checked) {
            setBrandFilter([...brandFilter, e.target.value]);
        } else {
            setBrandFilter(
                brandFilter.filter((item) => item !== e.target.value)
            );
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
            setPriceFilter(
                priceFilter.filter((item) => item !== e.target.value)
            );
        }
    }

    function ratingHandler(e) {
        if (e.target.checked) {
            setRatingFilter([...ratingFilter, e.target.value]);
        } else {
            setRatingFilter(
                ratingFilter.filter((item) => item !== e.target.value)
            );
        }
    }

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (sortPanel && ref.current && !ref.current.contains(e.target)) {
                setSortPanel(false);
            }
        };

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [sortPanel]);

    return (
        <div>
            <div className="relative bg-white w-full flex flex-wrap items-center gap-y-4 gap-x-2 justify-center sm:justify-between p-4 rounded-lg shadow-sm">
                <div className="flex justify-center items-center max-md:flex-col">
                    <div
                        className="group cursor-pointer flex items-center font-medium text-gray-700"
                    >
                        <MdFilterListAlt
                            className="mr-2 h-5 w-5 flex-none text-gray-400 "
                            aria-hidden="true"
                        />
                        {filterCount} Filters
                    </div>

                    <div className="pl-2">
                        <button
                            type="button"
                            className="text-gray-500 text-xs hover:text-gray-400 hover:underline "
                            onClick={() => {
                                clearFilters();
                            }}
                        >
                            ( Clear all )
                        </button>
                    </div>
                </div>
                <div className="  grid grid-cols-4 justify-items-start  max-sm:grid-cols-2 space-x-6 px-4 text-sm sm:px-6  lg:px-8">
                    <div
                        onMouseEnter={() => setBrandPanel(true)}
                        onMouseLeave={() => setBrandPanel(false)}
                        className="relative inline-block text-left mr-4"
                    >
                        <div>
                            <button
                                type="button"
                                className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:text-blue-600 hover:underline hover:bg-gray-50"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                            >
                                Brand
                                <svg
                                    className="  h-5 w-5 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        {brandPanel && (
                            <div
                                className="absolute p-6 grid grid-cols-2 gap-4 gap-x-8 left-0 z-10 mt-0 w-60 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabIndex="-1"
                            >
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
                                            checked={brandFilter.includes(item)}
                                        />
                                        <label
                                            htmlFor={`brand-${idx}`}
                                            className="ml-1.5 min-w-0 flex-1 text-gray-600"
                                        >
                                            {item}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div
                        onMouseEnter={() => setRamPanel(true)}
                        onMouseLeave={() => setRamPanel(false)}
                        className="relative inline-block text-left mr-4"
                    >
                        <div>
                            <button
                                type="button"
                                className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold hover:text-blue-600 hover:underline  hover:bg-gray-50"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                            >
                                Ram
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        {ramPanel && (
                            <div
                                className="absolute p-6 grid grid-cols-2 gap-4 gap-x-8 left-0 z-10 mt-0 w-60 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabIndex="-1"
                            >
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
                                            checked={ramFil.includes(
                                                String(item)
                                            )}
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
                        )}
                    </div>

                    <div
                        onMouseEnter={() => setPricePanel(true)}
                        onMouseLeave={() => setPricePanel(false)}
                        className="relative inline-block text-left mr-4 "
                    >
                        <div>
                            <button
                                type="button"
                                className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:text-blue-600 hover:underline  hover:bg-gray-50"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                            >
                                Price
                                <svg
                                    className="  h-5 w-5 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        {pricePanel && (
                            <div
                                className="absolute p-6 grid grid-cols-1 gap-4 gap-x-8 left-0 z-10 mt-0 w-44 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabIndex="-1"
                            >
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
                                            checked={priceFilter.includes(
                                                String(item.value)
                                            )}
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
                        )}
                    </div>

                    <div
                        onMouseEnter={() => setRatingPanel(true)}
                        onMouseLeave={() => setRatingPanel(false)}
                        className="relative inline-block text-left mr-4"
                    >
                        <div>
                            <button
                                type="button"
                                className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:text-blue-600 hover:underline  hover:bg-gray-50"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                            >
                                Rating
                                <svg
                                    className="  h-5 w-5 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        {ratingPanel && (
                            <div
                                className="absolute p-6 grid grid-cols-2 gap-4 gap-x-8 left-0 z-10 mt-0 w-60 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabIndex="-1"
                            >
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
                                            onChange={(e) => {
                                                ratingHandler(e);
                                                e.preventDefault();
                                            }}
                                            checked={ratingFilter.includes(
                                                String(item.value)
                                            )}
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
                        )}
                    </div>
                </div>

                <div className="relative inline-block text-left mr-4" ref={ref}>
                    <div onClick={() => setSortPanel(!sortPanel)}>
                        <button
                            type="button"
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            id="menu-button"
                            aria-expanded="true"
                            aria-haspopup="true"
                        >
                            Sort By
                            <svg
                                className="  h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    {sortPanel && (
                        <div
                            className="absolute right-0 z-10 mt-2   w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                        >
                            <div className="py-1" role="none">
                                <button
                                    href="#"
                                    className="block px-4 w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                    tabIndex="-1"
                                    id="menu-item-0"
                                    onClick={() => { 
                                        setSortBy("price");
                                        setSortOrder("asc");
                                        setSortPanel(false);
                                    }}
                                >
                                    Price (Low to High)
                                </button>
                                <button
                                    href="#"
                                    className="block px-4 w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                    tabIndex="-1"
                                    id="menu-item-0"
                                    onClick={() => { 
                                        setSortBy("price");
                                        setSortOrder("desc");
                                        setSortPanel(false);
                                    }}
                                >
                                    Price (High to Low)
                                </button>
                                <button
                                    href="#"
                                    className="block px-4 w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                    tabIndex="-1"
                                    id="menu-item-0"
                                    onClick={() => { 
                                        setSortBy("rating");
                                        setSortOrder("asc");
                                        setSortPanel(false);
                                    }}
                                >
                                    Rating (Low to High)
                                </button>
                                <button
                                    href="#"
                                    className="block px-4 w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                    tabIndex="-1"
                                    id="menu-item-0"
                                    onClick={() => { 
                                        setSortBy("rating");
                                        setSortOrder("desc");
                                        setSortPanel(false);
                                    }}
                                >
                                    Rating (high to Low)
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Filterbar;

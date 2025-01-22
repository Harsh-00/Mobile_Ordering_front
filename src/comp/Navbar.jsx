import React, { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { MobileContext } from "../context/MobileContext";
import { FaChevronDown } from "react-icons/fa";


const Navbar = () => {
    const nav = useNavigate();
    const ref = useRef();
    const checkUser = JSON.parse(sessionStorage?.getItem("user"));

    const { navMenu, setNavMenu, logoutHandler } = useContext(MobileContext);

    const navLinks = [
        { to: "/mobiles", label: "Mobiles" },
        checkUser?.role!=="Customer" && { to: "/add-product", label: "Add Mobile" },
        { to: "/compare", label: "Compare" },
        // { to: "/mobiles", label: "Home" },
    ];
 

    useEffect(() => {
        const checkIfClickedOutside = (e) => {  
            if (navMenu && ref.current && !ref.current.contains(e.target)) {
                setNavMenu(false);
            }
        };

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [navMenu,setNavMenu]);

    return (
        <div className="relative  ">
            {/* <header className="sm:px-8 px-4 py-2 z-10 w-full bg-[#2874f0] "> */}

            <header className="sm:px-8 px-4 py-2 w-full bg-white text-red-300 shadow-md ">
                <nav className="flex justify-between items-center max-container">
                    <Link
                        to="/"
                        className="text-4xl font-bold text-green-400 pb-1 flex items-center gap-2"
                    >
                        <img
                            src={logo}
                            alt=""
                            className="w-12 h-12 object-contain"
                        />
                        <span className="">MobiMart</span>
                    </Link>
                    <ul className="hidden lg:ml-6 lg:flex lg:space-x-8">
                        {navLinks.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    nav(item.to);
                                }}
                                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-gray-300 hover:text-gray-700 cursor-pointer"
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-4 justify-center items-center">
                        {/* Profile dropdown */}
                        {checkUser ? (
                            <div
                                as="div"
                                className="relative ml-4 flex-shrink-0"
                            >
                                <div className="flex gap-6">
                                    {checkUser.role === "Admin" && (
                                        <div className=" rounded-md border-2 px-2 font-semibold flex justify-center items-center text-red-400">
                                            Administrator
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer hover:scale-110 transform transition duration-300 ease-in-out border-1 border-gray-400 gap-2 "
                                        id="menu-button"
                                        aria-expanded="true"
                                        aria-haspopup="true"
                                        onClick={() => { 
                                            setNavMenu(!navMenu);
                                        }}
                                    >
                                        Accounts
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

                                {navMenu && (
                                    <div
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                        ref={ref}
                                    >
                                        <div className="absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {checkUser && (
                                                <div className="flex justify-start items-center">
                                                    <div className="relative flex rounded-full px-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src={`https://api.multiavatar.com/${checkUser.firstName}.png`}
                                                            // src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                                                            // src="https://xsgames.co/randomusers/avatar.php?g=male"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="px-1 py-4 text-sm text-gray-700 font-semibold underline ">
                                                        {`Hello, ${checkUser.firstName}`}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="hover:bg-gray-100">
                                                <a
                                                    href="/cart"
                                                    className="block px-4 py-2 text-sm text-gray-700"
                                                >
                                                    Your Cart
                                                </a>
                                            </div>

                                            <div className="hover:bg-gray-100">
                                                <a
                                                    href="/wishlist"
                                                    className="block px-4 py-2 text-sm text-gray-700"
                                                >
                                                    Your Wishlist
                                                </a>
                                            </div>

                                            <div className="hover:bg-gray-100">
                                                <a
                                                    href="/orders"
                                                    className="block px-4 py-2 text-sm text-gray-700"
                                                >
                                                    Your Orders
                                                </a>
                                            </div>
                                            {checkUser && (
                                                <div
                                                    className="hover:bg-gray-100"
                                                    onClick={logoutHandler}
                                                >
                                                    <a
                                                        href="/login"
                                                        className="block px-4 py-2 text-sm text-gray-700"
                                                    >
                                                        Log Out
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="rounded-md bg-indigo-100 px-5 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-200"
                                onClick={() => nav("/login")}
                            >
                                Login
                            </button>
                        )}
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;

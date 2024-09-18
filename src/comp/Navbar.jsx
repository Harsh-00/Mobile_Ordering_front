import React, { useContext, useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { IoSearchSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
  
import { IoMdHeart } from "react-icons/io";
import { MobileContext } from "../context/MobileContext";

const Navbar = () => {
    const nav = useNavigate();
    const ref=useRef();
    const checkUser = JSON.parse(sessionStorage?.getItem("user"));
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {navMenu, setNavMenu,logoutHandler}=useContext(MobileContext);

    const navLinks = [
        { to: "/", label: "Mobiles" },
        { to: "/add-product", label: "Add Mobile" },
        // { to: "/mobiles", label: "Home" },
    ];

    // function logoutHandler() {
    //     sessionStorage.removeItem("token");
    //     sessionStorage.removeItem("user");
    //     toast.success("Logged Out");
    //     nav("/login");
    // }

    useEffect(() => {
        const checkIfClickedOutside = e => { 
          if (navMenu && ref.current && !ref.current.contains(e.target)) {
            setNavMenu(false)
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [navMenu])

    return (
        <div className="relative">
            {/* <header className="sm:px-8 px-4 py-2 z-10 w-full bg-[#2874f0] "> */}

            <header className="sm:px-8 px-4 py-2 z-10 w-full bg-transparent text-red-300 ">
                <nav className="flex justify-between items-center max-container">
                    <Link
                        to="/"
                        className="text-4xl font-bold text-green-200 pb-1 flex items-center gap-2"
                    >
                        <img
                            src={logo}
                            alt=""
                            className="w-12 h-12 object-contain"
                        />
                        <span className="">MobiMart</span>
                    </Link>
                    <ul className="hidden lg:ml-6 lg:flex lg:space-x-8">
                        {navLinks.map((item) => (
                            <li
                                key={item.label}
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
                                <div
                                className="cursor-pointer hover:scale-110"
                                    onClick={() => {
                                        setNavMenu(!navMenu);
                                    }}
                                >
                                    <div className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src={`https://api.multiavatar.com/${checkUser.firstName}.png`}
                                            // src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                                            // src="https://xsgames.co/randomusers/avatar.php?g=male"
                                            alt=""
                                        />
                                    </div>
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
                                        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            
                                            {checkUser &&<div className="px-4 py-2 text-sm text-gray-700 font-semibold underline "> 
                                                {`Hello, ${checkUser.firstName}`}
                                
                                            </div>}
                                            

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
                                                        href="#"
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

                        {/* {checkUser && (
                            <div className="font-semibold  text-lg hover:underline cursor-pointer mr-8">{`Hello, ${checkUser.firstName}`}</div>
                        )} */}

                        {/* <div
                            className="font-medium  wide:mr-24 cursor-pointer rounded-lg p-1.5 px-3 bg-white"
                            onClick={() => nav("/cart")}
                        >
                            <FaShoppingCart className="text-2xl text-green-600" />
                        </div>
                        <div
                            className=" font-semibold  wide:mr-24 cursor-pointer rounded-lg p-1.5 px-4 bg-white"
                            onClick={() => nav("/wishlist")}
                        >
                            <IoMdHeart className=" text-2xl text-red-500 " />
                        </div> */}
                        {/* {checkUser ? (
                            <div
                                className="font-semibold  wide:mr-24 cursor-pointer rounded-lg p-1.5 px-4 bg-white "
                                onClick={logoutHandler}
                            >
                                <p className="text-md ">Logout</p>
                            </div>
                        ) : (
                            <div
                                className="font-semibold  wide:mr-24 cursor-pointer rounded-lg p-1.5 px-4 bg-white mr-8"
                                onClick={() => nav("/login")}
                            >
                                <p className="text-md ">Login</p>
                            </div>
                        )} */}
                    </div>

                    <div
                        className="hidden max-lg:block cursor-pointer"
                        onClick={() => {
                            setIsMenuOpen(true);
                        }}
                    >
                        <RxHamburgerMenu className="text-4xl" />
                    </div>
                </nav>
            </header>
            {/* {isMenuOpen && (
                <div className="">
                    <nav className="fixed top-0 right-0 left-0 bottom-0 lg:bottom-auto bg-slate-100 z-40">
                        <div
                            className="hidden max-lg:block fixed right-0 px-8 py-4 cursor-pointer"
                            onClick={() => {
                                setIsMenuOpen(false);
                            }}
                        >
                            <AiOutlineClose className="text-4xl" />
                        </div>
                        <ul className=" lg:hidden flex flex-col items-center justify-center h-full ">
                            {navLinks.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.to}
                                        className=" text-lg text-slate-gray"
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )} */}
        </div>
    );
};

export default Navbar;

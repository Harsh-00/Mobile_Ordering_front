import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { MobileContext } from "../context/MobileContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";  

const Login = () => {
    const {
        info,
        setInfo,
        loginRequest,
        regInfo,
        setRegInfo,
        RegisterRequest,
    } = useContext(MobileContext);
    const [register, setRegister] = useState(false);
    const nav = useNavigate();
    function changeHandler(e) {
        setInfo({ ...info, [e.target.name]: e.target.value });
    }
    function regChangeHandler(e) {
        setRegInfo({ ...regInfo, [e.target.name]: e.target.value });
    }
    function loginHandler(e) {
        e.preventDefault(); 

        const userData = {
            email: info.email,
            password: info.password,
        };
        toast.promise(loginRequest(userData), {
            loading: "Logging in...",
            success: "Login Successfull",
            error: "Invalid Credentials",
        });
        // loginRequest(userData);
        setInfo({ email: "", password: "" });
    }

    function guestHandler(e) {
        e.preventDefault();
        setInfo({ email: "test@customer.com", password: "customer123" });
        const userData = {
            email: "test@customer.com",
            password: "customer123",
        };
        toast.promise(loginRequest(userData), {
            loading: "Logging in...",
            success: "Login Successfull",
            error: "Invalid Credentials",
        });
        setInfo({ email: "", password: "" });
    }

    function RegInfoHandler(e) {
        e.preventDefault();
        if (regInfo.password !== regInfo.confirmPassword) {
            return toast.error("Password and Confirm Password should be same");
        }
        if (regInfo.password.length < 6) {
            return toast.error("Password should be atleast 6 characters long");
        }
        const userData = {
            firstName: regInfo.firstName,
            lastName: regInfo.lastName,
            email: regInfo.email,
            password: regInfo.password,
            role: regInfo.role,
            mobileNo: regInfo.mobileNo,
        }; 
        RegisterRequest(userData);
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            nav("/");
        }
    }, [nav]);

    return (
        <div className="flex min-h-screen flex-1  bg-gradient-to-b from-[#ebf4f5] to-[#F1EAFF] lg:grid lg:grid-cols-5 max-lg:justify-center max-lg:item-center">
            {!register && (
                <div className="flex col-span-2 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none max-lg:w-[500px] lg:px-20 xl:px-24">
                    <div>
                        <div>
                            <img
                                className="h-10 w-auto"
                                src={logo}
                                alt="Your Company"
                            />
                            <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>
                        <form action="#" method="POST" className="space-y-6">
                            <div className="mt-10">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        name="email"
                                        value={info.email}
                                        onChange={changeHandler}
                                        id="email"
                                        required
                                        className="block w-full px-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        placeholder="Enter Your Password"
                                        name="password"
                                        value={info.password}
                                        onChange={changeHandler}
                                        required
                                        className="block w-full px-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-3 block text-sm leading-6 text-gray-700"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm leading-6">
                                    <div 
                                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                                    >
                                        Forgot password?
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={loginHandler}
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-10">
                        <div className="relative">
                            <div
                                className="absolute inset-0 flex items-center"
                                aria-hidden="true"
                            >
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm font-medium leading-6">
                                <span className="  px-6 text-gray-900">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <button
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={guestHandler}
                            >
                                Guest
                            </button>
                            <button
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => setRegister(true)}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Register */}

            {register && (
                <div className="flex col-span-2 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none max-lg:w-[500px] lg:px-20 xl:px-24">
                    <div>
                        <div
                            className="w-fit self-start mt-8 mb-12 cursor-pointer text-blue-500 hover:text-blue-700 flex gap-2 justify-center items-center"
                            onClick={() => setRegister(false)}
                        >
                            <IoArrowBack className="text-2xl" />
                            Back to Login
                        </div>
                        <form action="#" method="POST" className="space-y-3">
                            <div className="flex gap-4">
                                <div className=" w-1/2">
                                    <label
                                        htmlFor="firstName"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        First Name
                                    </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            placeholder="Enter Your First Name"
                                            name="firstName"
                                            value={regInfo.firstName}
                                            onChange={regChangeHandler}
                                            required
                                            className="block w-full px-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Last Name
                                    </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            placeholder="Enter Your Last Name"
                                            name="lastName"
                                            value={regInfo.lastName}
                                            onChange={regChangeHandler}
                                            required
                                            className="block w-full px-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label
                                        htmlFor="role"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Role
                                    </label>
                                    <div className="">
                                        <select
                                            value={regInfo.role}
                                            name="role"
                                            className="block w-full px-3 rounded-md  border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={regChangeHandler}
                                        >
                                            <option
                                                value="Customer"
                                                name="role"
                                            >
                                                Customer
                                            </option>
                                            <option value="Seller" name="role">
                                                Seller
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <label
                                        htmlFor="mobileNo"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Mobile
                                    </label>
                                    <div className="">
                                        <input
                                            type="number"
                                            placeholder="Your Mobile Number"
                                            name="mobileNo"
                                            value={regInfo.mobileNo}
                                            onChange={regChangeHandler}
                                            required
                                            className="block w-full px-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <div className="">
                                    <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        name="email"
                                        value={regInfo.email}
                                        onChange={regChangeHandler}
                                        required
                                        className="block w-full px-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Password
                                    </label>
                                    <div className="">
                                        <input
                                            type="password"
                                            placeholder="Enter Your Password"
                                            name="password"
                                            value={regInfo.password}
                                            onChange={regChangeHandler}
                                            className="block w-full px-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="">
                                        <input
                                            type="password"
                                            placeholder="Confirm your Password"
                                            name="confirmPassword"
                                            value={regInfo.confirmPassword}
                                            onChange={regChangeHandler}
                                            required
                                            className="block w-full px-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mt-16 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={RegInfoHandler}
                                >
                                    Register Now
                                </button>
                            </div>
                        </form>
                    </div>
                    
                </div>
            )}

            <div className="absolute hidden w-full flex-1 col-span-3 lg:block lg:relative">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                    alt=""
                />
            </div>
        </div>
    );
};

export default Login;

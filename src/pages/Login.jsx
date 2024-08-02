import React, { useContext, useEffect, useState } from "react";
import Waihou from "../assets/Inn.svg";
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
        console.log(info);

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
        console.log(userData);
        RegisterRequest(userData);
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            nav("/");
        }
    }, []);

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
                                    <a
                                        href="#"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                                    >
                                        Forgot password?
                                    </a>
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
                /* <div className="flex flex-col justify-center items-center w-[45%] ">
					<div className="flex flex-col justify-center items-center ">
						<div className="w-full mx-auto">
							<h1 className="text-3xl font-semibold">
								Welcome To Book My Phone
							</h1>
							<p className="mt-1 opacity-60 text-center ">
								Purchase Mobile Phone with ease
							</p>
						</div>
						<div className="w-full pt-10 px-4">
							<label>
								<p className="font-semibold pb-1">Email</p>
								<input
									type="email"
									placeholder="Enter Your Email"
									name="email"
									value={info.email}
									className="w-full rounded-lg px-2 py-2.5 text-sm "
									onChange={changeHandler}
								/>
							</label>

							<label>
								<p className="font-semibold pb-1 pt-4">
									Password
								</p>
								<input
									type="password"
									placeholder="Enter Your Password"
									name="password"
									className="w-full rounded-lg px-2 py-2.5 text-sm"
									value={info.password}
									onChange={changeHandler}
								/>
							</label>

							<p className="text-end text-xs text-blue-500 pt-2 cursor-pointer hover:text-blue-700">
								Forget Password ?
							</p>
						</div>

						<div className="w-full px-6">
							<div
								className="mt-8 rounded-lg p-2  cursor-pointer w-full text-center font-semibold bg-blue-500 text-white"
								onClick={loginHandler}
							>
								Login
							</div>
							<p className="text-center pt-16">
								Don't have an account ?
							</p>
							<div className="w-full flex gap-2 mt-2">
								<div
									className=" w-full px-4  cursor-pointer rounded-lg text-center font-semibold py-1.5  bg-blue-500 text-white"
									onClick={() => setRegister(true)}
								>
									Register
								</div>
								<div
									className="w-full px-4  cursor-pointer rounded-lg text-center font-semibold py-1.5  bg-blue-500 text-white"
									onClick={guestHandler}
								>
									Guest
								</div>
							</div>
						</div>
					</div>
				</div> */
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





// (
// 	<div className="flex flex-col justify-center items-center w-[45%] ">
// 		<div className="flex flex-col justify-center items-center ">
// 			<div className="w-full mx-auto">
// 				<h1 className="text-3xl font-semibold text-center">
// 					Welcome To Book My Phone
// 				</h1>
// 				<p className="mt-1 opacity-60 text-center ">
// 					Purchase Mobile Phone with ease
// 				</p>
// 			</div>
// 			<div
// 				className="w-fit self-start mt-8 mb-6 cursor-pointer text-blue-500 			  hover:text-blue-700 flex gap-2 justify-center items-center"
// 				onClick={() => setRegister(false)}
// 			>
// 				<IoArrowBack className="text-2xl" />
// 				Back to Login
// 			</div>
// 			<div className="w-full ">
// 				<div className="flex w-full gap-6 ">
// 					<label className="w-full mt-4">
// 						<p className="text-sm font-semibold ">
// 							First Name
// 						</p>
// 						<input
// 							type="text"
// 							placeholder="Enter Your First Name"
// 							name="firstName"
// 							value={regInfo.firstName}
// 							className="w-full rounded-lg px-2 py-2.5 text-sm "
// 							onChange={regChangeHandler}
// 						/>
// 					</label>
// 					<label className="w-full mt-4">
// 						<p className="text-sm font-semibold  ">
// 							Last Name
// 						</p>
// 						<input
// 							type="text"
// 							placeholder="Enter Your Last Name"
// 							name="lastName"
// 							value={regInfo.lastName}
// 							className="w-full rounded-lg px-2 py-2.5 text-sm "
// 							onChange={regChangeHandler}
// 						/>
// 					</label>
// 				</div>
// 				<div className="flex w-full gap-6 mb-4">
// 					<label className="w-full mt-4">
// 						<p className="text-sm font-semibold ">
// 							Role
// 						</p>
// 						<select
// 							value={regInfo.role}
// 							name="role"
// 							className="w-full rounded-lg px-2 py-2.5 text-sm "
// 							onChange={regChangeHandler}
// 						>
// 							<option value="Customer" name="role">
// 								Customer
// 							</option>
// 							<option value="Seller" name="role">
// 								Seller
// 							</option>
// 						</select>
// 						{/* <input
// 							type="email"
// 							placeholder="Enter Your Email"
// 							name="role"
// 							value={regInfo.role}
// 							className="w-full rounded-lg px-2 py-2.5 text-sm "
// 							onChange={regChangeHandler}
// 						/> */}
// 					</label>

// 					<label className="w-full mt-4">
// 						<p className="text-sm font-semibold  ">
// 							Mobile Number
// 						</p>
// 						<input
// 							type="number"
// 							placeholder="Your Mobile Number"
// 							name="mobileNo"
// 							value={regInfo.mobileNo}
// 							className="w-full rounded-lg px-2 py-2.5 text-sm "
// 							onChange={regChangeHandler}
// 						/>
// 					</label>
// 				</div>
// 				<label className="w-full">
// 					<p className="text-sm font-semibold ">Email</p>
// 					<input
// 						type="email"
// 						placeholder="Enter Your Email"
// 						name="email"
// 						value={regInfo.email}
// 						className="w-full rounded-lg px-2 py-2.5 text-sm "
// 						onChange={regChangeHandler}
// 					/>
// 				</label>
// 				<div className="flex w-full gap-6  ">
// 					<label className="w-full mt-4">
// 						<p className="font-semibold text-sm ">
// 							Password
// 						</p>
// 						<input
// 							type="password"
// 							placeholder="Enter Your Password"
// 							name="password"
// 							value={regInfo.password}
// 							className="w-full rounded-lg px-2 py-2.5 text-sm "
// 							onChange={regChangeHandler}
// 						/>
// 					</label>
// 					<label className="w-full mt-4">
// 						<p className="text-sm font-semibold  ">
// 							Confirm Password
// 						</p>
// 						<input
// 							type="password"
// 							placeholder="Confirm your Password"
// 							name="confirmPassword"
// 							value={regInfo.confirmPassword}
// 							className="w-full rounded-lg px-2 py-2.5 text-sm "
// 							onChange={regChangeHandler}
// 						/>
// 					</label>
// 				</div>
// 				<div
// 					className=" w-full mt-8 px-4  cursor-pointer rounded-lg text-center font-semibold py-1.5  bg-blue-500 text-white"
// 					onClick={RegInfoHandler}
// 				>
// 					Register
// 				</div>
// 			</div>
// 		</div>
// 	</div>
// )

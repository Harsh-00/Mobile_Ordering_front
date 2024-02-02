import React, { useContext, useEffect, useState } from "react";
import Waihou from "../assets/Inn.svg";
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
		loginRequest(userData);
		setInfo({ email: "", password: "" });
	}

	function guestHandler(e) {
		e.preventDefault();
		setInfo({ email: "test@customer.com", password: "customer123" });
		const userData = {
			email: "test@customer.com",
			password: "customer123",
		};
		loginRequest(userData);
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
		<div className="flex h-screen p-5 bg-gradient-to-b from-[#ebf4f5] to-[#F1EAFF]">
			{!register && (
				<div className="flex flex-col justify-center items-center w-[45%] ">
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
				</div>
			)}
			{/* Register */}
			{register && (
				<div className="flex flex-col justify-center items-center w-[45%] ">
					<div className="flex flex-col justify-center items-center ">
						<div className="w-full mx-auto">
							<h1 className="text-3xl font-semibold text-center">
								Welcome To Book My Phone
							</h1>
							<p className="mt-1 opacity-60 text-center ">
								Purchase Mobile Phone with ease
							</p>
						</div>
						<div
							className="w-fit self-start mt-8 mb-6 cursor-pointer text-blue-500 hover:text-blue-700 flex gap-2 justify-center items-center"
							onClick={() => setRegister(false)}
						>
							<IoArrowBack className="text-2xl" />
							Back to Login
						</div>
						<div className="w-full ">
							<div className="flex w-full gap-6 ">
								<label className="w-full mt-4">
									<p className="text-sm font-semibold ">
										First Name
									</p>
									<input
										type="text"
										placeholder="Enter Your First Name"
										name="firstName"
										value={regInfo.firstName}
										className="w-full rounded-lg px-2 py-2.5 text-sm "
										onChange={regChangeHandler}
									/>
								</label>
								<label className="w-full mt-4">
									<p className="text-sm font-semibold  ">
										Last Name
									</p>
									<input
										type="text"
										placeholder="Enter Your Last Name"
										name="lastName"
										value={regInfo.lastName}
										className="w-full rounded-lg px-2 py-2.5 text-sm "
										onChange={regChangeHandler}
									/>
								</label>
							</div>
							<div className="flex w-full gap-6 mb-4">
								<label className="w-full mt-4">
									<p className="text-sm font-semibold ">
										Role
									</p>
									<select
										value={regInfo.role}
										name="role"
										className="w-full rounded-lg px-2 py-2.5 text-sm "
										onChange={regChangeHandler}
									>
										<option value="Customer" name="role">
											Customer
										</option>
										<option value="Seller" name="role">
											Seller
										</option>
									</select>
									{/* <input
										type="email"
										placeholder="Enter Your Email"
										name="role"
										value={regInfo.role}
										className="w-full rounded-lg px-2 py-2.5 text-sm "
										onChange={regChangeHandler}
									/> */}
								</label>

								<label className="w-full mt-4">
									<p className="text-sm font-semibold  ">
										Mobile Number
									</p>
									<input
										type="number"
										placeholder="Your Mobile Number"
										name="mobileNo"
										value={regInfo.mobileNo}
										className="w-full rounded-lg px-2 py-2.5 text-sm "
										onChange={regChangeHandler}
									/>
								</label>
							</div>
							<label className="w-full">
								<p className="text-sm font-semibold ">Email</p>
								<input
									type="email"
									placeholder="Enter Your Email"
									name="email"
									value={regInfo.email}
									className="w-full rounded-lg px-2 py-2.5 text-sm "
									onChange={regChangeHandler}
								/>
							</label>
							<div className="flex w-full gap-6  ">
								<label className="w-full mt-4">
									<p className="font-semibold text-sm ">
										Password
									</p>
									<input
										type="password"
										placeholder="Enter Your Password"
										name="password"
										value={regInfo.password}
										className="w-full rounded-lg px-2 py-2.5 text-sm "
										onChange={regChangeHandler}
									/>
								</label>
								<label className="w-full mt-4">
									<p className="text-sm font-semibold  ">
										Confirm Password
									</p>
									<input
										type="password"
										placeholder="Confirm your Password"
										name="confirmPassword"
										value={regInfo.confirmPassword}
										className="w-full rounded-lg px-2 py-2.5 text-sm "
										onChange={regChangeHandler}
									/>
								</label>
							</div>
							<div
								className=" w-full mt-8 px-4  cursor-pointer rounded-lg text-center font-semibold py-1.5  bg-blue-500 text-white"
								onClick={RegInfoHandler}
							>
								Register
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="p-6 rounded-2xl">
				<img
					src={Waihou}
					alt=""
					className="w-full h-full object-cover"
				/>
			</div>
		</div>
	);
};

export default Login;

import React, { useContext, useEffect, useState } from "react";
import Waihou from "../assets/Inn.svg";
import { MobileContext } from "../context/MobileContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const { info, setInfo, loginRequest } = useContext(MobileContext);
	const nav = useNavigate();
	function changeHandler(e) {
		setInfo({ ...info, [e.target.name]: e.target.value });
	}
	function loginHandler(e) {
		e.preventDefault();
		console.log(info);

		const userData = {
			email: info.email,
			password: info.password,
		};
		loginRequest(userData);
	}

	useEffect(() => {
		if (sessionStorage.getItem("token")) {
			nav("/");
		}
	}, []);

	return (
		<div className="flex h-screen p-5 bg-gradient-to-b from-[#ebf4f5] to-[#F1EAFF]">
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
							<p className="font-semibold pb-1 pt-4">Password</p>
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
							<div className=" w-full px-4  cursor-pointer rounded-lg text-center font-semibold py-1.5  bg-blue-500 text-white">
								Register
							</div>
							<div className="w-full px-4  cursor-pointer rounded-lg text-center font-semibold py-1.5  bg-blue-500 text-white">
								Guest
							</div>
						</div>
					</div>
				</div>
			</div>
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

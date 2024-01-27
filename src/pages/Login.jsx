import React, { useContext, useState } from "react";
import login1 from "../assets/login-1.svg";
import login2 from "../assets/login-2.svg";
import login3 from "../assets/login-3.svg";
import axios from "axios";
import { MobileContext } from "../context/MobileContext";

const Login = () => {
	const { info, setInfo, loginRequest } = useContext(MobileContext);
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

	return (
		<div className="grid grid-cols-2 bg-gray-300">
			<div className="flex flex-col">
				<h1>Welcome To Book My Phone</h1>
				<p>Order Mobile Phone with ease</p>

				<label>
					<p>Email</p>
					<input
						type="email"
						placeholder="Enter Your Email"
						name="email"
						value={info.email}
						onChange={changeHandler}
					/>
				</label>

				<label>
					<p>Password</p>
					<input
						type="password"
						placeholder="Enter Your Password"
						name="password"
						value={info.password}
						onChange={changeHandler}
					/>
				</label>

				<p>Forget Password ?</p>

				<div
					className="border-2 w-fit px-4 border-black cursor-pointer"
					onClick={loginHandler}
				>
					Login
				</div>
				<p>Don't have an account ?</p>
				<div className="border-2 w-fit px-4 border-black cursor-pointer">
					Register
				</div>
				<div className="border-2 w-fit px-4 border-black cursor-pointer">
					Continue as Guest
				</div>
			</div>
			<div className="">
				<img src={login1} className="h-[200px]"></img>
				<img src={login2} className="h-[200px]"></img>
				<img src={login3} className="h-[200px]"></img>
			</div>
		</div>
	);
};

export default Login;

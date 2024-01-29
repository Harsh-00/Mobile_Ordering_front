import React, { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import { MobileContext } from "../context/MobileContext";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
	const nav = useNavigate();
	const checkUser = JSON.parse(sessionStorage?.getItem("user"));
	console.log(checkUser);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [currRoute, setCurrRoute] = useState("/");
	const navLinks = [
		{ to: "/mobiles", label: "Mobiles" },
		{ to: "/add-product", label: "Add Mobile" },
		// { to: "#about-us", label: "About Us" },
		// { to: "#contact-us", label: "Contact Us" },
	];

	const { addProduct, setAddProduct } = useContext(MobileContext);

	function logoutHandler() {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user");
		nav("/login");
	}
	return (
		<div className="relative">
			{addProduct && <AddProduct />}
			<header className="sm:px-8 px-4 py-2 z-10 w-full bg-blue-400 ">
				<nav className="flex justify-between items-center max-container">
					<Link
						to="/"
						className="text-4xl font-bold text-green-200 pb-1"
					>
						Logo
					</Link>
					<ul className="flex-1  flex justify-center items-center gap-16 max-lg:hidden">
						{navLinks.map((item) => (
							<li
								key={item.label}
								onClick={() => {
									nav(item.to);
									setCurrRoute(item.to);
								}}
								className={`text-lg text-slate-gray cursor-pointer rounded-xl px-2 py-0.5 ${
									currRoute == item.to
										? "bg-white font-semibold"
										: " "
								} `}
							>
								{item.label}
							</li>
						))}
					</ul>
					<div className="flex gap-2 justify-center items-center">
						{checkUser ? (
							<div className="flex gap-2 justify-center items-center">
								<div className="font-semibold text-white text-lg hover:underline cursor-pointer mr-8">{`Hello, ${checkUser.firstName}`}</div>
								<div
									className="font-semibold  wide:mr-24 cursor-pointer rounded-xl p-1.5 px-4 bg-white "
									onClick={logoutHandler}
								>
									<p className="text-md ">Logout</p>
								</div>
							</div>
						) : (
							<div
								className="font-semibold  wide:mr-24 cursor-pointer rounded-xl p-1.5 px-4 bg-white mr-8"
								onClick={() => nav("/login")}
							>
								<p className="text-md ">Login</p>
							</div>
						)}
						<div
							className=" font-semibold  wide:mr-24 cursor-pointer rounded-xl p-1.5 px-4 bg-white"
							onClick={() => nav("/wishlist")}
						>
							<p className="text-md ">Wishlist</p>
						</div>
						<div
							className="font-medium  wide:mr-24 cursor-pointer rounded-xl p-1.5 bg-white"
							onClick={() => nav("/cart")}
						>
							<FaShoppingCart className="text-2xl text-green-600" />
						</div>
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
			{isMenuOpen && (
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

							<li
								className="text-lg text-slate-gray"
								onClick={() => {
									setAddProduct(true);
									setIsMenuOpen(false);
								}}
							>
								Add Product
							</li>
						</ul>
					</nav>
				</div>
			)}
		</div>
	);
};

export default Navbar;

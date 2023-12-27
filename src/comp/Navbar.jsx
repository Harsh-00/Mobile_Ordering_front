import React, { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import { MobileContext } from "../context/MobileContext";

const Navbar = () => {
	const nav = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [currRoute, setCurrRoute] = useState("/");
	const navLinks = [
		{ to: "/", label: "Home" },
		{ to: "/mobiles", label: "Mobiles" },
		// { to: "#about-us", label: "About Us" },
		// { to: "#contact-us", label: "Contact Us" },
	];

	const { addProduct, setAddProduct } = useContext(MobileContext);

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
					<div
						className="flex gap-2 text-lg font-medium max-lg:hidden wide:mr-24 cursor-pointer rounded-xl px-3 py-0.5 bg-white"
						onClick={() => setAddProduct(true)}
					>
						Add Product
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
				<div>
					<nav className="fixed top-0 right-0 left-0 bottom-0 lg:bottom-auto bg-slate-100 ">
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
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			)}
		</div>
	);
};

export default Navbar;

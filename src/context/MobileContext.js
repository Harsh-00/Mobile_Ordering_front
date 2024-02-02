import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const MobileContext = React.createContext();

export function MobileProvider({ children }) {
	const nav = useNavigate();
	const [info, setInfo] = useState({
		email: "",
		password: "",
	});

	const [regInfo, setRegInfo] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: "Customer",
		mobileNo: "",
	});

	const [allMob, setAllMob] = useState([]);
	const [wishList, setWishList] = useState([]);

	console.log("Wishhh", wishList);
	const [cart, setCart] = useState([]);
	console.log("Carttt", cart);
	const [loading, setLoading] = useState(true);

	const [addProduct, setAddProduct] = useState(false);

	const [brand, setBrand] = useState([]);
	console.log("Bran", brand);
	const [filter, setFilter] = useState([]);
	const [ram, setRam] = useState([]);
	const [ramFilter, setRamFilter] = useState([]);

	// got it by ipconfig command in cmd
	// const BASE_URL = "http://192.168.22.197:3001";
	// const BASE_URL = "http://localhost:3001";
	const BASE_URL = "https://mobile-ordering-backend.onrender.com";

	async function loginRequest(userData) {
		try {
			const res = await axios.post(`${BASE_URL}/mobiles/login`, userData);
			toast.success("Login Successfull");
			sessionStorage.setItem("token", res.data.token);
			sessionStorage.setItem("user", JSON.stringify(res.data.verifyUser));
			console.log(res);

			nav("/");
		} catch (error) {
			if (error.response.status === 401) {
				return toast.error("Invalid Credentials");
			}
			alert("Error while login ");
		}
	}

	async function RegisterRequest(userData) {
		try {
			const res = await axios.post(
				`${BASE_URL}/mobiles/register`,
				userData
			);
			toast.success("Registration Successfull");
		} catch (error) {}
	}

	async function fetchAllMobiles() {
		try {
			const res = await axios.get(`${BASE_URL}/mobiles/all`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			console.log(res);
			await getCart();
			await getWishList();
			setLoading(false);
			setAllMob(res.data.info);
		} catch (error) {
			if (error.response.status === 401) {
				return nav("/login");
			}
			alert("Error while fetching all mobile ");
		}
	}

	if (allMob?.length > 0 && brand?.length === 0) {
		storeBrands();
	}
	async function storeBrands() {
		allMob?.map((items) => {
			brand.push(items.brand);
		});
		setBrand([...new Set(brand)].sort());
	}

	if (allMob?.length > 0 && ram?.length === 0) {
		storeRam();
	}
	async function storeRam() {
		allMob?.map((items) => {
			ram.push(items.ram);
		});
		setRam([...new Set(ram)].sort((a, b) => a - b));
	}

	async function addToCart(key) {
		try {
			const res = await axios.get(`${BASE_URL}/mobiles/cart/${key}`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			// console.log("Add to ", res);
			getCart();
		} catch (error) {
			if (error.response.status === 401) {
				return nav("/login");
			}
			alert("Error while adding to cart ");
		}
	}

	async function getCart() {
		try {
			const res = await axios.get(`${BASE_URL}/mobiles/cart`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			console.log("in getcart", res);
			setCart(res.data.list);
		} catch (error) {
			if (error.response.status === 401) {
				return nav("/login");
			}
			alert("Error while fetching cart ");
		}
	}

	async function addToWishList(key) {
		try {
			const res = await axios.get(`${BASE_URL}/mobiles/wishlist/${key}`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			getWishList();
		} catch (error) {
			if (error.response.status === 401) {
				nav("/login");
			}
			alert("Error while adding to wishlist ");
		}
	}

	async function getWishList() {
		try {
			const res = await axios.get(`${BASE_URL}/mobiles/wishlist`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			console.log("in getwishlist", res);
			setWishList(res.data.list);
		} catch (error) {
			if (error.response.status === 401) {
				return nav("/login");
			}
			alert("Error while fetching wishlist ");
		}
	}

	async function fetchFiltered() {
		try {
			setLoading(true);
			if (filter?.length === 0 && ramFilter?.length === 0) {
				return fetchAllMobiles();
			}
			const res = await axios.get(`${BASE_URL}/mobiles/filter`, {
				params: {
					filter: JSON.stringify(filter),
					ramFilter: JSON.stringify(ramFilter),
				},
			});

			console.log(res.data.message);
			setLoading(false);
			setAllMob(res.data.message);
		} catch (error) {
			if (error.response.status === 401) {
				return nav("/login");
			}
			alert("Error while fetching filtered mobile ");
		}
	}

	const val = {
		info,
		setInfo,
		regInfo,
		RegisterRequest,
		setRegInfo,
		loginRequest,
		allMob,
		setAllMob,
		addToWishList,
		getWishList,
		wishList,
		cart,
		addToCart,
		getCart,
		addProduct,
		setAddProduct,
		fetchAllMobiles,
		storeBrands,
		setLoading,
		loading,
		brand,
		BASE_URL,
		filter,
		setFilter,
		fetchFiltered,
		ram,
		setRam,
		ramFilter,
		setRamFilter,
	};
	return (
		<MobileContext.Provider value={val}>{children}</MobileContext.Provider>
	);
}

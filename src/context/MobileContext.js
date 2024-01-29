import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const MobileContext = React.createContext();

export function MobileProvider({ children }) {
	const nav = useNavigate();
	const [info, setInfo] = useState({ email: "", password: "" });

	const [allMob, setAllMob] = useState([]);

	// var li = [];
	// if (sessionStorage.getItem("user")) {
	// 	li = JSON.parse(sessionStorage?.getItem("user")).wishlist;
	// }
	const [wishList, setWishList] = useState([]);
	const [cart, setCart] = useState([]);
	console.log("Context Wishlist", wishList);
	const [loading, setLoading] = useState(true);

	const BASE_URL = "http://localhost:3001";
	// const BASE_URL = "https://mobile-ordering-backend.onrender.com";

	const [addProduct, setAddProduct] = useState(false);

	const [brand, setBrand] = useState([]);
	const [filter, setFilter] = useState([]);

	const [ram, setRam] = useState([]);
	const [ramFilter, setRamFilter] = useState([]);

	// console.log(filter);
	// console.log("RAm", ramFilter);

	async function loginRequest(userData) {
		try {
			const res = await axios.post(`${BASE_URL}/mobiles/login`, userData);
			toast.success("Login Successfull");
			sessionStorage.setItem("token", res.data.token);
			sessionStorage.setItem("user", JSON.stringify(res.data.verifyUser));
			console.log(res);
			nav("/");
		} catch (error) {
			if(error.response.status === 401){
				toast.error("Invalid Credentials");
			}
			console.log("Error while login ", error);
		}
	}

	async function fetchAllMobiles() {
		try {
			const res = await axios.get(`${BASE_URL}/mobiles/all`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			console.log(res);
			setLoading(false);
			setAllMob(res.data.info);
		} catch (error) {
			if (error.response.status === 401) {
				nav("/login");
			}
			console.log("Error while fetching all mobile ", error);
		}
	}

	if (allMob?.length > 0 && brand?.length === 0) {
		storeBrands();
	}
	async function storeBrands() {
		allMob?.map((items) => {
			brand.push(items.brand);
		});
		setBrand([...new Set(brand)]);
	}

	if (allMob?.length > 0 && ram?.length === 0) {
		storeRam();
	}
	async function storeRam() {
		allMob?.map((items) => {
			ram.push(items.ram);
		});
		setRam([...new Set(ram)]);
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
				nav("/login");
			}
		}
	}

	async function getCart() {
		try {
			const res = await axios.get(`${BASE_URL}/mobiles/cart`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			setCart(res.data.list);
		} catch (error) {
			if (error.response.status === 401) {
				nav("/login");
			}
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
		}
	}

	async function getWishList() {
		try {
			const res = await axios.get(`${BASE_URL}/mobiles/wishlist`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			setWishList(res.data.list);
		} catch (error) {
			if (error.response.status === 401) {
				nav("/login");
			}
		}
	}

	async function fetchFiltered() {
		try {
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
			setAllMob(res.data.message);
		} catch (error) {
			if (error.response.status === 401) {
				nav("/login");
			}
		}
	}

	const val = {
		info,
		setInfo,
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

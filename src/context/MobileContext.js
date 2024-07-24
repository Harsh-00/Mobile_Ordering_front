import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const MobileContext = React.createContext();

export function MobileProvider({ children }) {

	
	const [brandFilter, setBrandFilter] = useState([]);
	const [ramFil, setRamFil] = useState([]);
	const [priceFilter, setPriceFilter] = useState([]);
	const [ratingFilter, setRatingFilter] = useState([]);

	
	const [brand, setBrand] = useState([]);
	const [ram, setRam] = useState([]);
	const [price, setPrice] = useState([
        { name: "0 - $500", value: [0, 500] },
        { name: "$500 - $1000", value: [501, 1000] },
        { name: "$1000 - $1500", value: [1001, 1500] },
        { name: "$1500 - $2000", value: [1501, 2000] },
        { name: "$2000 - $2500", value: [2001, 2500] },
        { name: "$2500 - $3000", value: [2501, 3000] },
        { name: "Above $3000", value: [3001, 1000000] },
    ]);
    const [rating, setRating] = useState([
        { name: "1 ", value: 1 },
        { name: "2 ", value: 2 },
        { name: "3 ", value: 3 },
        { name: "4 ", value: 4 },
        { name: "5 ", value: 5 },
    ]);


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

	const [cart, setCart] = useState([]);
	const [loading, setLoading] = useState(true);

	const [addProduct, setAddProduct] = useState(false);

	const [filter, setFilter] = useState([]);
	const [ramFilter, setRamFilter] = useState([]);

	// got it by ipconfig command in cmd
	// const BASE_URL = "http://192.168.22.197:3001";
	const BASE_URL = "http://localhost:3001";
	// const BASE_URL = "https://mobile-ordering-backend.onrender.com";

	async function loginRequest(userData) {
		try {
			const res = await axios.post(`${BASE_URL}/mobiles/login`, userData);
			// toast.success("Login Successfull");
			sessionStorage.setItem("token", res.data.token);
			sessionStorage.setItem("user", JSON.stringify(res.data.verifyUser));
			console.log(res);

			nav("/");
		} catch (error) {
			// if (error.response.status === 401) {
			// 	return toast.error("Invalid Credentials");
			// }
			// alert("Error while login ");
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
			setWishList(res.data.list);
		} catch (error) {
			if (error.response.status === 401) {
				return nav("/login");
			}
			alert("Error while fetching wishlist ");
		}
	}
	
	async function fetchFilteredd() {
		try {

			setLoading(true);
			if (brandFilter?.length === 0 && ramFil?.length === 0 && priceFilter?.length === 0 && ratingFilter?.length === 0) {
				return fetchAllMobiles();
			}
			const res = await axios.get(`${BASE_URL}/mobiles/filters`, {
				params: {
					brandFilter: JSON.stringify(brandFilter),
					ramFil: JSON.stringify(ramFil),
					priceFilter: JSON.stringify(priceFilter),
					ratingFilter: JSON.stringify(ratingFilter),
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

	async function fetchFiltered() {
		// try {
		// 	console.log("I am in fetchFiltered");
			
		//     console.log(filter);
		// 	setLoading(true);
		// 	if (filter?.length === 0 && ramFilter?.length === 0) {
		// 		return fetchAllMobiles();
		// 	}
		// 	const res = await axios.get(`${BASE_URL}/mobiles/filter`, {
		// 		params: {
		// 			filter: JSON.stringify(filter),
		// 			ramFilter: JSON.stringify(ramFilter),
		// 		},
		// 	});

		// 	console.log(res.data.message);
		// 	setLoading(false);
		// 	setAllMob(res.data.message);
		// } catch (error) {
		// 	if (error.response.status === 401) {
		// 		return nav("/login");
		// 	}
		// 	alert("Error while fetching filtered mobile ");
		// }
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
		fetchFilteredd,
		ram,
		setRam,
		ramFilter,
		setRamFilter,
		brandFilter,
		setBrandFilter,
		ramFil,
		setRamFil,
		priceFilter,
		setPriceFilter,
		ratingFilter,
		setRatingFilter,
		price, setPrice,
		rating, setRating,
	};
	return (
		<MobileContext.Provider value={val}>{children}</MobileContext.Provider>
	);
}

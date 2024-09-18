import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {loadStripe} from '@stripe/stripe-js';


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

	const [navMenu, setNavMenu] = useState(false);

	const [allMob, setAllMob] = useState([]);
	const [wishList, setWishList] = useState([]);

	const [cart, setCart] = useState([]);
	const [loading, setLoading] = useState(true);

	const [addProduct, setAddProduct] = useState(false);

	const [filter, setFilter] = useState([]);
	const [ramFilter, setRamFilter] = useState([]);

	const [filterCount, setFilterCount] = useState(0);

	const [orders, setOrders] = useState([]);
	
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	
	async function clearFilters(){
		setBrandFilter([]);
		setRamFil([]);
		setPriceFilter([]);
		setRatingFilter([]);
	}
	
	const[resa,setRes]=useState(null);
	// useEffect(() => {
		// 	console.log(resa);
		// }, [resa]);
		
	const [user, setUser] = useState(null); 
	useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

	async function stripeCheckout(amount){
		try {
			const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
			if (!stripe) {
				throw new Error('Stripe failed to initialize');
			}
			const res = await axios.post(`${BASE_URL}/mobiles/checkout` , {amount: amount,products: cart,userId:JSON.parse(sessionStorage.getItem('user'))?._id} );

			setRes(res);
			const session = res.data; 

			const result= await stripe.redirectToCheckout({
				sessionId: session.id,
			});
		} catch (error) {
			console.log(error);
			return toast.error("Error while processing payment");
		}
	}

	async function stripeOrder(id,status){
		try{ 

			const res = await axios.get(`${BASE_URL}/mobiles/${status}?session_id=${id}`  ); 
		}
		catch(e)
		{
			console.log(e);
			toast.error("Error while fetching order status"); 
		}
	}

	async function orderHistoryUser()
	{
		try {
			if(user==null) throw new Error("User not logged in");
			const id=JSON.parse(user)?._id;
			const res = await axios.get(`${BASE_URL}/mobiles/orders/user/${id}` , {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			setOrders(res.data.message);

		} catch (e) {
			toast.error(e.message);
			return nav("/login");
		}
	}

	async function loginRequest(userData) {
		try {
			const res = await axios.post(`${BASE_URL}/mobiles/login`, userData);
			// toast.success("Login Successfull");
			sessionStorage.setItem("token", res.data.token);
			sessionStorage.setItem("user", JSON.stringify(res.data.verifyUser));
			setUser(res.data.verifyUser);

			nav("/");
		} catch (error) {
			console.log(error);
			return toast.error("Invalid Credentials"); 
		}
	}

	async function RegisterRequest(userData) {
		try {
			const res = await axios.post(
				`${BASE_URL}/mobiles/register`,
				userData
			);
			toast.success("Registration Successfull");
		} catch (error) {
			console.log(error);
			return toast.error("Registration Failed");
		}
	}

	async function logoutHandler()
	{
		try{
			sessionStorage.removeItem("token");
        	sessionStorage.removeItem("user");
        	toast.success("Logged Out");
        	nav("/login"); 
			setUser(null);
		}
		catch(e)
		{
			console.log(e);
			return toast.error("Error while logging out");
		}
	}

	async function sortAllMob(check){
		try {
			let sortedArr =[...allMob];
			if(check==="priceAsc"){
				sortedArr.sort((a, b) => a.price - b.price);
			}
			else if(check==="priceDesc"){
				sortedArr.sort((a, b) => b.price - a.price);
			}
			else if(check==="ratingAsc"){
				sortedArr.sort((a, b) => a.rating - b.rating);
			}
			else if(check==="ratingDesc"){
				sortedArr.sort((a, b) => b.rating - a.rating);
				setAllMob(sortedArr);
				}
		} catch (error) {
			console.log(error);
			toast.error("Error while fetching all mobile ");
		}

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
			console.log(error);
			toast.error("Error while fetching all mobile ");
			return nav("/login");
		}
	}

	if (allMob?.length > 0 && brand?.length === 0) {
		storeBrands();
	}
	async function storeBrands() {
		try {
			allMob?.map((items) => {
				brand.push(items.brand);
			});
			setBrand([...new Set(brand)].sort());
		} catch (error) {
			
			console.log(error);
			toast.error("Error while fetching all Brands");
		}
	}

	if (allMob?.length > 0 && ram?.length === 0) {
		storeRam();
	}
	async function storeRam() {
		try {
			allMob?.map((items) => {
				ram.push(items.ram);
			});
			setRam([...new Set(ram)].sort((a, b) => a - b));
		} catch (error) {
			console.log(error);
			toast.error("Error while fetching all Ram");
		}
	}

	async function addToCart(key) {
		try {
			await axios.get(`${BASE_URL}/mobiles/cart/${key}`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			getCart();
		} catch (error) {
			console.log(error);
			toast.error("Error while adding to cart ");
			return nav("/");
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
			console.log(error);
			toast.error("Error while fetching cart ");
			return nav("/");
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
			console.log(error);
			toast.error("Error while adding to wishlist ");
			return nav("/");
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
			console.log(error);
			toast.error("Error while fetching wishlist ");
			return nav("/");
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
			setLoading(false);
			setAllMob(res.data.message);
		} catch (error) {
			console.log(error);
			toast.error("Error while fetching filtered mobile ");
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
		sortAllMob,
		storeBrands,
		setLoading,
		loading,
		brand,
		BASE_URL,
		filter,
		setFilter, 
		fetchFilteredd,
		ram,
		setRam,
		ramFilter,
		setRamFilter,
		brandFilter,
		setBrandFilter,
		ramFil,
		setRamFil,
		stripeOrder,
		priceFilter,
		setPriceFilter,
		ratingFilter,
		setRatingFilter,
		price, setPrice,orderHistoryUser,orders,logoutHandler,
		rating, setRating,filterCount, setFilterCount,clearFilters,stripeCheckout,navMenu, setNavMenu
	};
	return (
		<MobileContext.Provider value={val}>{children}</MobileContext.Provider>
	);
}

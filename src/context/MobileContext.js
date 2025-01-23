import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {loadStripe} from '@stripe/stripe-js';
import { use } from "react";


export const MobileContext = React.createContext();

export function MobileProvider({ children }) {

	const [user, setUser] = useState(() => {
		const savedUser = sessionStorage.getItem("user");
		return savedUser ? JSON.parse(savedUser) : null;
	  });

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
	const [compare, setCompare] = useState([]);
	const [cart, setCart] = useState([]);
	const [loading, setLoading] = useState(true);
	const [addProduct, setAddProduct] = useState(false);
	const [filter, setFilter] = useState([]);
	const [ramFilter, setRamFilter] = useState([]);
	const [filterCount, setFilterCount] = useState(0);
	const [orders, setOrders] = useState([]); 
	const [mobById, setMobById] = useState([]);

	const [sortBy, setSortBy] = useState("");
	const [sortOrder, setSortOrder] = useState("");

	const [currPage, setCurrPage] = useState(1);
	const [pageLimit, setPageLimit] = useState(9);
	const [totalPages, setTotalPages] = useState(0);
	const [totalItems, setTotalItems] = useState(0);

	const BASE_URL = process.env.REACT_APP_BASE_URL;
	
	const clearFilters = useCallback(() => {
        setBrandFilter([]);
        setRamFil([]);
        setPriceFilter([]);
        setRatingFilter([]);
    }, []); 
 

	const getCompare=useCallback(async () => {
		try {
			const res = await axios.get(`${BASE_URL}/v1/compare`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			setCompare(res.data.info);
		} catch (error) {
			if(error.response.status===404){
				// toast( error.response.data.message);
					return;
				 
			}
			toast.error("Error while fetching compare");
			nav("/login");
		}
	} ,[ setCompare, nav, BASE_URL]);

	const fetchBrandRam = useCallback(async (brandFilter, ramFil) => {
		try {
			setLoading(true);
			const res = await axios.get(`${BASE_URL}/v1/mobiles/filters`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			setLoading(false);
			setRam(res.data.info.ram);
			setBrand(res.data.info.brands);
		} catch (error) {
			toast.error("Error while fetching brands and RAM");
		}
	}, []);

	const getCart = useCallback(async () => {
		try {
			const res = await axios.get(`${BASE_URL}/v1/cart`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			setCart(res.data.info);
		} catch (error) {
			toast.error("Error while fetching cart");
			nav("/");
		}
	}, [setCart, nav, BASE_URL]);

	const getWishList = useCallback(async () => {
		try {
			const res = await axios.get(`${BASE_URL}/v1/wishlist`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			setWishList(res.data.info);
		} catch (error) {
			toast.error("Error while fetching wishlist");
			nav("/");
		}
	}, [setWishList, nav, BASE_URL]);

	useEffect(() => {
		if (!user) {
			nav("/login");
		} else {
	
			fetchFiltered(currPage, pageLimit)
			getCart();
			getWishList();
			getCompare();
		}
	}, [user, nav, getCart, getWishList, getCompare]);  

	useEffect(() => {
		fetchBrandRam();
		fetchFiltered(currPage, pageLimit);
	}, [user,currPage, pageLimit]);

	const mobileById=useCallback(async(id)=>{
		try { 
			const res = await axios.get(`${BASE_URL}/v1/mobiles/${id}`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			setMobById(res.data.info);
		} catch (error) {
			toast.error("Error while fetching mobile");
			return nav("/");
		}
	},[])


	const stripeCheckout = useCallback(async (amount) => {
        try {
            const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
            if (!stripe) throw new Error('Stripe failed to initialize');

            const res = await axios.post(`${BASE_URL}/v1/checkout`, { amount, products: cart, userId: JSON.parse(sessionStorage.getItem('user'))?._id });

            await stripe.redirectToCheckout({
                sessionId: res.data.info,
            });
        } catch (error) {
            toast.error("Error while processing payment");
        }
    }, [BASE_URL, cart]);

	const stripeOrder = useCallback(async (id, status) => {
        try {
            await axios.get(`${BASE_URL}/v1/${status}?session_id=${id}`);
        } catch (error) {
            toast.error("Error while fetching order status");
        }
    }, [BASE_URL]);

	const orderHistoryUser=useCallback(async()=>
	{
		try {
		
			const user = sessionStorage.getItem("user");
			if (!user) throw new Error("User not logged in");
			 
			const id=JSON.parse(user)?._id;
			const res = await axios.get(`${BASE_URL}/v1/orders/user/${id}` , {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			setOrders(res.data.info);

		} catch (e) {
			toast.error(e.message);
			return nav("/login");
		}
	},[BASE_URL, nav]);

	async function loginRequest(userData) {
		try {
			const res = await axios.post(`${BASE_URL}/v1/login`, userData);
			// toast.success("Login Successfull");
			sessionStorage.setItem("token", res.data.token);
			sessionStorage.setItem("user", JSON.stringify(res.data.verifyUser));
			setUser(res.data.verifyUser);

			nav("/");
		} catch (error) {
			return toast.error("Invalid Credentials"); 
		}
	}

	async function RegisterRequest(userData) {
		try {
			await axios.post(
				`${BASE_URL}/v1/register`,
				userData
			);
			toast.success("Registration Successfull");
		} catch (error) {
			return toast.error("Registration Failed");
		}
	}

	const logoutHandler = useCallback(() => {
        try {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user"); 
      		setUser(null);
      		setCart([]);
      		setWishList([]);
      		setCompare([]);
            toast.success("Logged Out");
            nav("/login");
        } catch (error) { 
            toast.error("Error while logging out");
        }
    }, [nav]);

	
	

	const addToCompare = useCallback(async (key) => {
		try {
			await axios.get(`${BASE_URL}/v1/compare/${key}`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			await getCompare();
		} catch (error) {
			if(error.response.status===404){
				toast( error.response.data.message);
				return;
			}
			toast.error("Error while adding to compare");
			nav("/login");
		}
	},[ getCompare, nav, BASE_URL]);


	const addToCart = useCallback(async (key) => {
		try {
			await axios.get(`${BASE_URL}/v1/cart/${key}`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			await getCart();
		} catch (error) {
			toast.error("Error while adding to cart");
			nav("/");
		}
	}, [ getCart, nav, BASE_URL]);

	
	
	const addToWishList = useCallback(async (key) => {
		try {
			await axios.get(`${BASE_URL}/v1/wishlist/${key}`, {
				headers: {
					Authorization: sessionStorage.getItem("token"),
				},
			});
			getWishList();
		} catch (error) {
			toast.error("Error while adding to wishlist");
			nav("/");
		}
	}, [ getWishList, nav, BASE_URL]);

	 
	/* eslint-disable react-hooks/exhaustive-deps */
	const fetchFiltered = useCallback(async (page,limit) => {
        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}/v1/filters`, {
                params: {
                    brandFilter: JSON.stringify(brandFilter),
                    ramFil: JSON.stringify(ramFil),
                    priceFilter: JSON.stringify(priceFilter),
                    ratingFilter: JSON.stringify(ratingFilter),
					sortBy: sortBy,
					sortOrder : sortOrder,
					page,
					limit,
                },
            }); 
			
            setLoading(false);
			setTotalItems(res.data.extra.pagination.totalItems);
			setTotalPages(res.data.extra.pagination.totalPages);
            setAllMob(res.data.info);
        } catch (error) {
			if(error.response.status===401){
				toast(
					"Please Login to Continue.",
					{
					  duration: 4000,
					  icon: '🔒',
					}
				  );
				return nav("/login");
			}
            toast.error("Error while fetching mobiles");
        }
    }, [ brandFilter, ramFil, priceFilter, ratingFilter, sortBy, sortOrder, BASE_URL]); 
	/* eslint-enable react-hooks/exhaustive-deps */
 

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
		fetchBrandRam,
		setLoading,
		loading,
		brand,
		BASE_URL,
		filter,
		setFilter, 
		fetchFiltered,
		sortBy, setSortBy,
		sortOrder, setSortOrder,
		ram,
		setRam,
		ramFilter,
		setRamFilter,
		brandFilter,
		setBrandFilter,
		ramFil,
		compare,
		setCompare,
		setRamFil,
		stripeOrder,
		currPage, setCurrPage,
		pageLimit, setPageLimit,
		totalPages, setTotalPages,
		totalItems, setTotalItems,
		priceFilter,
		setPriceFilter,
		ratingFilter,user,addToCompare,getCompare,mobileById,mobById, setMobById,
		setRatingFilter,
		price, setPrice,orderHistoryUser,orders,logoutHandler,
		rating, setRating,filterCount, setFilterCount,clearFilters,stripeCheckout,navMenu, setNavMenu
	};
	return (
		<MobileContext.Provider value={val}>{children}</MobileContext.Provider>
	);
}

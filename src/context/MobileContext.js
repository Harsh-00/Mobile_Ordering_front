import React, { useState } from "react";
import axios from "axios";

export const MobileContext = React.createContext();

export function MobileProvider({ children }) {
	const [allMob, setAllMob] = useState([]);
	const [loading, setLoading] = useState(true);

	const BASE_URL = "http://localhost:3001";
	//  https://mobile-ordering-backend.onrender.com/

	const [addProduct, setAddProduct] = useState(false);

	const [brand, setBrand] = useState([]);
	const [filter, setFilter] = useState([]);

	const [ram, setRam] = useState([]);
	const [ramFilter, setRamFilter] = useState([]);

	console.log(filter);
	console.log("RAm", ramFilter);

	async function fetchAllMobiles() {
		try {
			const res = await axios.get(`${BASE_URL}/mobiles/all`);
			console.log(res);

			setLoading(false);
			setAllMob(res.data.info);
		} catch (e) {
			console.log("Error while fetching all mobile ", e);
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

	async function fetchFiltered() {
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
	}

	const val = {
		allMob,
		setAllMob,
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

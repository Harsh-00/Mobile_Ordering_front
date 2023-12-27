import React, { useContext, useEffect } from "react";
import { MobileContext } from "../context/MobileContext";

const Sidebar = () => {
	const {
		brand,
		filter,
		setFilter,
		fetchFiltered,
		ram,
		setRamFilter,
		ramFilter,
	} = useContext(MobileContext);

	useEffect(() => {
		fetchFiltered();
	}, [filter, ramFilter]);

	function filterHandler(e) {
		if (e.target.checked) {
			setFilter([...filter, e.target.value]);
		} else {
			setFilter(filter.filter((item) => item !== e.target.value));
		}
	}

	function RAMHandler(e) {
		if (e.target.checked) {
			setRamFilter([...ramFilter, e.target.value]);
		} else {
			setRamFilter(ramFilter.filter((item) => item !== e.target.value));
		}
	}
	return (
		<div className="pl-3">
			<h1 className="w-full  text-2xl font-semibold pt-6 underline pl-20 pb-4">
				Filter
			</h1>
			<div className="mt-5 font-semibold text-lg mb-1">Brand</div>
			<div className="pl-3">
				{brand?.map((item, idx) => {
					return (
						<div key={idx}>
							<label>
								<input
									type="checkbox"
									value={item}
									id={idx}
									onChange={filterHandler}
									className="mr-2 mb-2"
								/>
								{item}
							</label>
						</div>
					);
				})}
			</div>
			<div className="mt-6 font-semibold text-lg mb-1">RAM</div>
			<div className="pl-3">
				{ram?.map((item, idx) => {
					return (
						<div key={idx}>
							<label>
								<input
									type="checkbox"
									value={item}
									id={idx}
									onChange={RAMHandler}
									className="mr-2 mb-2"
								/>
								{item} GB
							</label>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Sidebar;

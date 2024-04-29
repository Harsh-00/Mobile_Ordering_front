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
		<div className="w-full">
			<div className="mt-8 font-semibold text-lg mb-1 max-md:mt-4">
				Brand
			</div>
			<div className="pl-3 flex flex-col flex-wrap max-md:flex-row max-md:gap-6">
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
			<div className="mt-6 font-semibold text-lg mb-1 max-md:mt-3">
				RAM
			</div>
			<div className="pl-3 flex flex-col flex-wrap max-md:flex-row max-md:gap-6">
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

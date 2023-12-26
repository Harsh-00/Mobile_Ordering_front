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
		<div>
			<h1>Filter</h1>
			<div>Brand</div>
			<div>
				{brand?.map((item, idx) => {
					return (
						<div key={idx}>
							<label>
								<input
									type="checkbox"
									value={item}
									id={idx}
									onChange={filterHandler}
								/>
								{item}
							</label>
						</div>
					);
				})}
			</div>
			<div>RAM</div>
			<div>
				{ram?.map((item, idx) => {
					return (
						<div key={idx}>
							<label>
								<input
									type="checkbox"
									value={item}
									id={idx}
									onChange={RAMHandler}
								/>
								{item}
							</label>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Sidebar;

//how to create a checkbox in react ?

//how to create a radio button in react ?
//how to create a dropdown in react ?

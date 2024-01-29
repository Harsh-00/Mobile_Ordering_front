import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MobileContext } from "../context/MobileContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
	const nav = useNavigate();
	const { addProduct, setAddProduct, BASE_URL } = useContext(MobileContext);

	async function submitHandler(e) {
		try {
			e.preventDefault();
			const res = await axios.post(`${BASE_URL}/mobiles/add`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			});
			console.log(res);
		} catch (error) {
			if (error.response.status === 403) {
				alert("You are not authorized to delete this product");
			}
			if (error.response.status === 401) {
				nav("/login");
			}
		}
	}
	return (
		<div className="h-screen bg-slate-200 z-20 flex justify-center items-center ">
			<form className="bg-white p-4 py-8 shadow-2xl w-[700px] min-h-[500px] mx-auto my-auto flex flex-col gap-4">
				<div className="grid grid-cols-2 gap-4 px-2">
					<label>
						<span className="font-semibold ">Name:</span>
						<span class="text-red-500">*</span>
						<input
							type="text"
							name="mobName"
							placeholder="Name of Model"
							className="px-2  rounded-lg ml-2 py-0.5 w-[200px] border-2 border-gray-400"
							required
						/>
					</label>

					<label>
						<span className="font-semibold ">Brand:</span>
						<span class="text-red-500">*</span>
						<input
							type="text"
							name="brand"
							placeholder="Brand Name"
							className="px-2 rounded-lg ml-2 py-0.5 w-[200px] border-2 border-gray-400"
							required
						/>
					</label>

					<label>
						<span className="font-semibold ">Price ($):</span>
						<span class="text-red-500">*</span>
						<input
							type="number"
							name="price"
							placeholder="ex: 500"
							className="px-2 rounded-lg ml-2 py-0.5 w-[200px] border-2 border-gray-400"
							required
						/>
					</label>

					<label>
						<span className="font-semibold ">Ram(GB):</span>
						<span class="text-red-500">*</span>
						<input
							type="number"
							name="ram"
							step="2"
							placeholder="ex: 8"
							className="px-2 rounded-lg ml-2 py-0.5 w-[200px] border-2 border-gray-400"
							required
						/>
					</label>

					<label>
						<span className="font-semibold ">Camera(MP):</span>
						<input
							type="number"
							name="camera"
							className="px-2 rounded-lg ml-2 py-0.5 w-[200px] border-2 border-gray-400"
							placeholder="Camera pixels"
						/>
					</label>

					<label>
						<span className="font-semibold ">Chipset:</span>
						<input
							type="text"
							name="chipset"
							placeholder="ex: Snapdragon 888"
							className="px-2 rounded-lg ml-2 py-0.5 w-[200px] border-2 border-gray-400"
						/>
					</label>

					<label>
						<span className="font-semibold ">Battery(mAh):</span>
						<input
							type="number"
							name="battery"
							placeholder="ex: 5000"
							className="px-2 rounded-lg ml-2 py-0.5 w-[200px] border-2 border-gray-400"
						/>
					</label>

					<label>
						<span className="font-semibold ">Battery Type:</span>
						<input
							type="text"
							name="batteryType"
							placeholder="ex: Li-Po"
							className="px-2 rounded-lg ml-2 py-0.5 w-[200px] border-2 border-gray-400"
						/>
					</label>

					<label>
						<span className="font-semibold ">Display(inch):</span>
						<input
							type="number"
							name="display"
							step="0.1"
							placeholder="ex: 6.5"
							className="px-2 rounded-lg ml-2 py-0.5 w-[200px] border-2 border-gray-400"
						/>
					</label>

					<label>
						<span className="font-semibold ">OS Type:</span>
						<input
							type="text"
							name="osType"
							className="px-2 rounded-lg ml-2 py-0.5 w-[200px] border-2 border-gray-400"
							placeholder="ex: Android 11"
						/>
					</label>

					<label>
						<span className="font-semibold ">Storage:</span>
						<input
							type="text"
							name="storage"
							placeholder="ex: 128GB"
							className="px-2 rounded-lg ml-2 py-0.5 w-[200px] border-2 border-gray-400"
						/>
					</label>

					<label>
						<span className="font-semibold ">Image(URL):</span>
						<input
							type="text"
							name="mobImg"
							className="px-2 rounded-lg ml-2 py-0.5 w-[200px] border-2 border-gray-400"
							placeholder="ex: https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg"
						/>
					</label>
					<label>
						<span className="font-semibold ">Relasing Date:</span>
						<input
							type="text"
							name="relasingDate"
							placeholder="ex: 25 Dec, 2023"
							className="px-2 rounded-lg ml-2 py-0.5 w-[200px] border-2 border-gray-400"
						/>
					</label>
					<label>
						<span className="font-semibold ">Body :</span>
						<input
							type="text"
							name="body"
							className="px-2 rounded-lg ml-2 py-0.5 w-[200px] border-2 border-gray-400"
							placeholder="ex: 240g, 7.7mm thickness, plastic body"
						/>
					</label>

					<label>
						<span className="font-semibold ">Video:</span>
						<input
							type="text"
							name="video"
							className="px-2 rounded-lg ml-2 py-0.5 w-[200px] border-2 border-gray-400"
							placeholder="ex: 2160p"
						/>
					</label>

					<label>
						<span className="font-semibold ">Display Res:</span>
						<input
							type="text"
							name="displayRes"
							placeholder="ex: 1080x2400 pixels"
							className="px-2 rounded-lg ml-2 py-0.5 w-[200px] border-2 border-gray-400"
						/>
					</label>
				</div>

				<input
					type="submit"
					value="Submit"
					onClick={submitHandler}
					className="mx-auto bg-green-500 text-white font-semibold text-lg rounded-xl px-4 py-0.5 mt-4 whitespace-nowrap"
				/>
			</form>
		</div>
	);
};

export default AddProduct;

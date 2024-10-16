import React, { useContext, useState } from "react";
import { MobileContext } from "../context/MobileContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddProduct = () => {
    const nav = useNavigate();
    const { BASE_URL } = useContext(MobileContext);

    const [data, setdata] = useState({
        mobName: undefined,
        brand: undefined,
        price: undefined,
        ram: undefined,
        camera: undefined,
        chipset: undefined,
        battery: undefined,
        batteryType: undefined,
        display: undefined,
        osType: undefined,
        storage: undefined,
        mobImg: undefined,
        relasingDate: undefined,
        body: undefined,
        video: undefined,
        displayRes: undefined,
    });

    async function submitHandler(e) {
        try {
            if (!data.mobName || !data.brand || !data.price || !data.ram) {
                toast.error("Required fields Empty");
                return;
            }
            e.preventDefault();

            toast.promise(
                 axios.post(
                    `${BASE_URL}/mobiles/add`,
                    { data },
                    {
                        headers: {
                            Authorization:
                                "Bearer " + sessionStorage.getItem("token"),
                        },
                    }
                ),
                {
                    loading: "Storing...",
                    success: <b>Entry Added!</b>,
                    error: <b>Try again Later</b>,
                }
            );
			nav("/");
        } catch (error) {
			toast.error("Error while adding product");
			return nav("/");
        }
    }

    function changeHandler(e) {
        e.preventDefault();
        setdata({ ...data, [e?.target?.name]: e?.target?.value });
    }
    return (
        <div className="h-screen bg-slate-200 z-20 mx-auto  flex   ">
            {/* <div className="bg-white p-4 py-8 shadow-2xl w-[700px] min-h-[500px] mx-auto my-auto flex flex-col gap-4"> */}
            <form className="bg-white mt-10 py-8 h-fit   shadow-2xl px-8    mx-auto flex flex-col  ">
                <div className="text-center">
                    <h2 class="text-lg underline font-semibold leading-7 text-gray-900">
                        Mobile Information
                    </h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600">
                        Fill in the details of the mobile you want to add
                    </p>
                </div>

                <div class="mt-14 grid grid-cols-4 gap-x-6 gap-y-8  ">
                    <div>
                        <label>
                            <span className="text-sm font-medium leading-6 text-gray-900">
                                Name:
                            </span>
                            <span class="text-red-500">*</span>
                            <input
                                type="text"
                                name="mobName"
                                value={data.mobName}
                                onChange={changeHandler}
                                placeholder="Name of Model"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            <span className="text-sm font-medium leading-6 text-gray-900">
                                Brand:
                            </span>
                            <span class="text-red-500">*</span>
                            <input
                                type="text"
                                name="brand"
                                placeholder="Brand Name"
                                value={data.brand}
                                onChange={changeHandler}
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            <span className="text-sm font-medium leading-6 text-gray-900">
                                Price ($):
                            </span>
                            <span class="text-red-500">*</span>
                            <input
                                type="number"
                                name="price"
                                value={data.price}
                                onChange={changeHandler}
                                placeholder="ex: 500"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span className="text-sm font-medium leading-6 text-gray-900">
                                Ram(GB):
                            </span>
                            <span class="text-red-500">*</span>
                            <input
                                type="number"
                                name="ram"
                                value={data.ram}
                                onChange={changeHandler}
                                step="2"
                                placeholder="ex: 8"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span className="text-sm font-medium leading-6 text-gray-900">
                                Camera(MP):
                            </span>
                            <input
                                type="number"
                                name="camera"
                                value={data.camera}
                                onChange={changeHandler}
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span className="text-sm font-medium leading-6 text-gray-900">
                                Chipset:
                            </span>
                            <input
                                type="text"
                                name="chipset"
                                value={data.chipset}
                                onChange={changeHandler}
                                placeholder="ex: Snapdragon 888"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span className="text-sm font-medium leading-6 text-gray-900">
                                Battery(mAh):
                            </span>
                            <input
                                type="number"
                                name="battery"
                                value={data.battery}
                                onChange={changeHandler}
                                placeholder="ex: 5000"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span className="text-sm font-medium leading-6 text-gray-900">
                                Battery Type:
                            </span>
                            <input
                                type="text"
                                name="batteryType"
                                value={data.batteryType}
                                onChange={changeHandler}
                                placeholder="ex: Li-Po"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span className="text-sm font-medium leading-6 text-gray-900">
                                Display(inch):
                            </span>
                            <input
                                type="number"
                                name="display"
                                value={data.display}
                                onChange={changeHandler}
                                step="0.1"
                                placeholder="ex: 6.5"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span className="text-sm font-medium leading-6 text-gray-900">
                                OS Type:
                            </span>
                            <input
                                type="text"
                                name="osType"
                                value={data.osType}
                                onChange={changeHandler}
                                placeholder="ex: Android 11"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span className="text-sm font-medium leading-6 text-gray-900">
                                Storage:
                            </span>
                            <input
                                type="text"
                                name="storage"
                                value={data.storage}
                                onChange={changeHandler}
                                placeholder="ex: 128GB"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span className="text-sm font-medium leading-6 text-gray-900">
                                Image(URL):
                            </span>
                            <input
                                type="text"
                                name="mobImg"
                                value={data.mobImg}
                                onChange={changeHandler}
                                placeholder="ex: https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span className="text-sm font-medium leading-6 text-gray-900">
                                Relasing Date:
                            </span>
                            <input
                                type="text"
                                name="relasingDate"
                                value={data.relasingDate}
                                onChange={changeHandler}
                                placeholder="ex: 25 Dec, 2023"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span className="text-sm font-medium leading-6 text-gray-900">
                                Body :
                            </span>
                            <input
                                type="text"
                                name="body"
                                value={data.body}
                                onChange={changeHandler}
                                placeholder="ex: 240g, 7.7mm thickness, plastic body"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span className="text-sm font-medium leading-6 text-gray-900">
                                Video:
                            </span>
                            <input
                                type="text"
                                name="video"
                                value={data.video}
                                onChange={changeHandler}
                                placeholder="ex: 2160p"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span className="text-sm font-medium leading-6 text-gray-900">
                                Display Res:
                            </span>
                            <input
                                type="text"
                                name="relasingDate"
                                value={data.relasingDate}
                                onChange={changeHandler}
                                placeholder="ex: 25 Dec, 2023"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </label>
                    </div>
                </div>

                <div class="mt-6 flex items-center justify-center w-full mx-auto"> 
                    <input 
                        
                    	type="submit"
                    	value="Submit"
                    	onClick={submitHandler}
                        class="rounded-md bg-indigo-600  px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    />
                </div>
            </form>
        </div>
    );
};

export default AddProduct;

import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MobileContext } from '../context/MobileContext';

const Failed = () => {
    const {stripeOrder}=useContext(MobileContext);
    const loc=useLocation();
    const param= new URLSearchParams(loc.search);
    const session_id=param.get('session_id');

    useEffect(()=>{
        stripeOrder(session_id,"failed");
    },[stripeOrder,session_id])
    
  return (
    <div>
            <div class="bg-gray-100 flex justify-center items-center h-screen">
                <div class="bg-white p-10 rounded-md   md:mx-auto">
                <svg
                class=" w-20 h-20 mx-auto my-6"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="16"
                height="16"
                viewBox="0 0 80 80"
            >
                <path
                    fill="#f78f8f"
                    d="M40,77.5C19.322,77.5,2.5,60.678,2.5,40S19.322,2.5,40,2.5S77.5,19.322,77.5,40S60.678,77.5,40,77.5 z"
                ></path>
                <path
                    fill="#c74343"
                    d="M40,3c20.402,0,37,16.598,37,37S60.402,77,40,77S3,60.402,3,40S19.598,3,40,3 M40,2 C19.013,2,2,19.013,2,40s17.013,38,38,38s38-17.013,38-38S60.987,2,40,2L40,2z"
                ></path>
                <path
                    fill="#fff"
                    d="M37 20H43V60H37z"
                    transform="rotate(-134.999 40 40)"
                ></path>
                <path
                    fill="#fff"
                    d="M37 20H43V60H37z"
                    transform="rotate(-45.001 40 40)"
                ></path>
            </svg>
                    
                    <div class="text-center">
                        <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center w-[380px]">
                            Payment Failed!
                        </h3>
                        <p class="text-gray-600 my-2">
                            Please Try Again Later.
                        </p>
                        <p> Have a great day! </p>
                        <div class="py-10 text-center">
                            <Link
                                to="/"
                                class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                            >
                                GO BACK
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Failed
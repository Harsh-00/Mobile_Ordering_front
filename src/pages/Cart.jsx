import React, { useContext, useEffect, useState } from "react";
import { MobileContext } from "../context/MobileContext";
import Card from "../comp/Card";
import empty from "../assets/empty.svg";
import { Navigate } from "react-router-dom"; 

const Cart = () => {
    const { getCart,getWishList,user, cart,stripeCheckout } = useContext(MobileContext);
	const [total, setTotal] = useState(0);

    useEffect(() => {
        if (!user) return <Navigate to="/login" />;
        getCart();
        getWishList();
    }, [user,getCart,getWishList]);

	useEffect(() => {
        if (!user) return <Navigate to="/login" />;
        async function getTotal() {
            let sum = 0;
            cart.forEach((item) => {
                sum += item.price;
            });
            setTotal(sum);
        }

		getTotal();
	},[user,cart]);

    return (
        //CART COMPONENT

        <div className="bg-white">
            <div className="relative mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mx-auto w-full text-center text-3xl font-semibold leading-6 pb-2 text-gray-800 underline">
                    Your Cart
                </div>
                <form className="relative mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section
                        aria-labelledby="cart-heading"
                        className="lg:col-span-7"
                    >
                        <div>
                            {cart?.length === 0 ? (
                                <div className="flex flex-col justify-center items-center gap-6 my-24">
                                    <img
                                        src={empty}
                                        alt="empty"
                                        className=" w-[200px] mx-auto"
                                    />
                                    <p className="text-4xl opacity-20 font-semibold">
                                        No Data Found
                                    </p>
                                </div>
                            ) : (
                                <div className="relative h-full w-full grid grid-cols-1 gap-8 p-4 pb-10 mb-6 mr-3 pt-6 mt-4  ">
                                    {cart?.map((item) => {
                                        return (
                                            <Card key={item.key} info={item} />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className=" sticky top-[20vh] mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                    >
                        <h2
                            id="summary-heading"
                            className="text-lg font-medium text-gray-900"
                        >
                            Order summary
                        </h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">
                                    Subtotal
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">
                                    ${total}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex items-center text-sm text-gray-600">
                                    <span>Shipping estimate</span>
                                    <div 
                                        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                                    >
                                        <div
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">
                                    $0
                                </dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex text-sm text-gray-600">
                                    <span>Tax estimate</span>
                                    <div 
                                        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                                    >
                                        <div
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">
                                    $0
                                </dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-medium text-gray-900">
                                    Order total
                                </dt>
                                <dd className="text-base font-medium text-gray-900">
                                    ${total}
                                </dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    stripeCheckout(total);
                                }}
                                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                                Checkout
                            </button>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    );
};

export default Cart;

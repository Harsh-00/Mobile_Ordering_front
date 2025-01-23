import React, { Fragment, useContext, useEffect } from "react" 
import { FaStar, FaBatteryFull, FaMemory, FaMicrochip, FaCamera, FaMobileAlt, FaCalendarAlt } from "react-icons/fa"
import { Tab } from "@headlessui/react"
import { MobileContext } from "../context/MobileContext"
import { useParams } from "react-router-dom"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function MobileDetailPage() {
  const { mobileById, mobById } = useContext(MobileContext)
  const { id } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
    mobileById(id)
  }, [id, mobileById])

  if (!mobById) {
    return <div>Loading...</div>
  }

  const reviews = {
    average: mobById.rating || 0,
    totalCount: mobById.review || 0
  }

  return (
      <div className="bg-white">
          <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              {/* Product */}
              <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
                  {/* Product image */}
                  <div className="lg:col-span-4 lg:row-end-1">
                      <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100 flex justify-center items-center">
                          <img
                              src={mobById.mobImg || "/placeholder.svg"}
                              alt={mobById.mobName}
                              className="py-8"
                              width={350}
                          />
                      </div>
                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                          <button
                              type="button"
                              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-200 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-50"
                          >
                              Add to Wishlist
                          </button>
                          <button
                              type="button"
                              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-200 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                          >
                              Add to Compare
                          </button>
                      </div>
                  </div>

                  {/* Product details */}
                  <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                      <div className="flex flex-col">
                          <div className="mt-4">
                              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                  {mobById.mobName}
                              </h1>
                              <p className="mt-1 text-sm text-gray-500">
                                  Brand: {mobById.brand}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                  {mobById.releaseDate}
                              </p>
                          </div>
                      </div>
 

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-1">
                          <button
                              type="button"
                              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                          >
                              Pay ${mobById.price}
                          </button>
                          <button
                              type="button"
                              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-200 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                          >
                              Add to Cart
                          </button>
                      </div> 
                      <div className="mt-8 mb-4 border-t border-gray-200 pt-8">
                          <h3 className="text-sm font-medium text-gray-900">
                              Highlights
                          </h3>
                          <div className="prose prose-sm mt-4 text-gray-500">
                              <ul role="list" className="list-disc pl-5 space-y-2">
                                  <li className="flex items-center">
                                      <FaMicrochip className="h-5 w-5 text-gray-400" />
                                      <p className="ml-2 text-sm text-gray-500">
                                        Processor: {mobById.chipset}
                                      </p>
                                  </li>
                                  <li className="flex items-center">
                                      <FaMobileAlt className="h-5 w-5 text-gray-400" />
                                      <p className="ml-2 text-sm text-gray-500">
                                          Display: {mobById.display} inch HD+
                                      </p>
                                  </li>
                                  <li className="flex items-center">
                                      <FaMemory className="h-5 w-5 text-gray-400" />
                                      <p className="ml-2 text-sm text-gray-500">
                                          RAM: {mobById.ram}GB
                                      </p>
                                  </li>
                                  <li className="flex items-center">
                                      <FaCamera className="h-5 w-5 text-gray-400" />
                                      <p className="ml-2 text-sm text-gray-500">
                                          Camera: {mobById.camera}MP Rear Camera
                                      </p>
                                  </li>
                                  <li className="flex items-center">
                                      <FaBatteryFull className="h-5 w-5 text-gray-400" />
                                      <p className="ml-2 text-sm text-gray-500">
                                          Battery: {mobById.battery}mAh
                                      </p>
                                  </li>  
                                  <li className="flex items-center">
                                      <FaMemory className="h-5 w-5 text-gray-400" />
                                      <p className="ml-2 text-sm text-gray-500">
                                          Storage: {mobById.storage}
                                      </p>
                                  </li>   
                                  
                              </ul>
                          </div>
                      </div>
                      <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
                      <Tab.Group>
                          <div className="border-b border-gray-200">
                              <Tab.List className="-mb-px flex space-x-8">
                                  <Tab
                                      className={({ selected }) =>
                                          classNames(
                                              selected
                                                  ? "border-indigo-600 text-indigo-600"
                                                  : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                                              "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                                          )
                                      }
                                  >
                                      Specifications
                                  </Tab>
                                  <Tab
                                      className={({ selected }) =>
                                          classNames(
                                              selected
                                                  ? "border-indigo-600 text-indigo-600"
                                                  : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                                              "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                                          )
                                      }
                                  >
                                      Reviews
                                  </Tab>
                              </Tab.List>
                          </div>
                          <Tab.Panels as={Fragment}>
                              <Tab.Panel className="-mb-10">
                                  <h3 className="sr-only">Specifications</h3>

                                  <dl className="mt-4 space-y-6 text-sm text-gray-600">
                                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                      <div>
                                          <dt className="font-medium text-gray-900">
                                              OS Type
                                          </dt>
                                          <dd className="mt-2">
                                              {mobById.osType}
                                          </dd>
                                          
                                      </div>
                                      <div>
                                          <dt className="font-medium text-gray-900">
                                              Display Resolution
                                          </dt>
                                          <dd className="mt-2">
                                              {mobById.displayRes}
                                          </dd>
                                      </div>
                                  </div>
                                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                      <div>
                                          <dt className="font-medium text-gray-900">
                                              Chipset
                                          </dt>
                                          <dd className="mt-2">
                                              {mobById.chipset}
                                          </dd>
                                      </div>
                                      <div>
                                          <dt className="font-medium text-gray-900">
                                              Video Resolution
                                          </dt>
                                          <dd className="mt-2">
                                              {mobById.video}
                                          </dd>
                                      </div>
                                  </div>
                                      
                                      
                                  </dl>
                              </Tab.Panel>

                              <Tab.Panel className="text-sm text-gray-500">
                                  <h3 className="sr-only">Customer Reviews</h3>

                                  <div className="flex items-center mt-8">
                                      <div className="flex items-center">
                                          {[0, 1, 2, 3, 4].map((rating) => (
                                              <FaStar
                                                  key={rating}
                                                  className={classNames(
                                                      reviews.average > rating
                                                          ? "text-yellow-400"
                                                          : "text-gray-300",
                                                      "h-6 w-6 flex-shrink-0"
                                                  )}
                                                  aria-hidden="true"
                                              />
                                          ))}
                                      </div>
                                      <p className="ml-2 text-md font-semibold text-gray-800">
                                          {reviews.average} out of 5 stars
                                      </p>
                                  </div>
                                  <p className="mt-2">
                                      Based on {reviews.totalCount} reviews
                                  </p>

                                  {/* You can add more detailed reviews here if available in your data */}
                              </Tab.Panel>
                          </Tab.Panels>
                      </Tab.Group>
                  </div>

                      
                  </div>

                  
              </div>
          </div>
      </div>
  );
}


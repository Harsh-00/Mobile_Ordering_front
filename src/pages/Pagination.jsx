import { useContext } from "react";
import { MobileContext } from "../context/MobileContext";

export default function Pagination() {
 
	const {currPage, setCurrPage, pageLimit, totalPages,totalItems}=useContext(MobileContext);

    return (
      <nav
        className="relative flex items-center justify-between border-t  border-gray-200 bg-white px-4 py-3 sm:px-6"
        aria-label="Pagination"
      >
        <div className="flex flex-1 justify-center items-center gap-4 pt-1 sm:gap-8 ">
          <div 
            className={`relative inline-flex items-center cursor-pointer rounded-md bg-white px-3 py-1.5 text-md font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${currPage===1? ' text-gray-200 ring-gray-200 cursor-not-allowed hover:bg-white':''}`}
            onClick={() => currPage>1? setCurrPage(currPage-1):null}
          >
            Previous
          </div>
          <div className="text-sm text-gray-700 underline font-bold">
            Page {currPage}/{totalPages}
          </div>
          <div
            className={`relative ml-3 inline-flex items-center cursor-pointer rounded-md bg-white px-3 py-1.5 text-md font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${currPage===totalPages? ' text-gray-200 ring-gray-200 cursor-not-allowed hover:bg-white':''}`}
            onClick={() => currPage<totalPages? setCurrPage(currPage+1):null}
          >
            Next
          </div>
        </div>

        <div className="absolute top-5 right-8 hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{Math.max(pageLimit*(currPage-1),1)}</span> to <span className="font-medium">{Math.min(pageLimit*(currPage),totalItems)}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
      </nav>
    )
  }
  
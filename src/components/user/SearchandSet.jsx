import React from 'react'

const SearchandSet = () => {
    return (
        <div className="flex items-center bg-white rounded-full shadow-md p-1 w-full max-w-4xl mx-auto mt-5 font-poppins">
            <div className="flex-1 p-2 mx-5">
                <label className="block text-gray-500 text-xs font-bold">Where</label>
                <input
                    type="text"
                    placeholder="Search destinations"
                    className="bg-transparent outline-none w-full text-gray-700 text-sm"
                />
            </div>
            <div className="flex-1 p-2 border-l border-gray-300">
                <label className="block text-gray-500 text-xs font-bold">Checkin</label>
                <input
                    type="text"
                    placeholder="Add dates"
                    className="bg-transparent outline-none w-full text-gray-700 text-sm"
                />
            </div>
            <div className="flex-1 p-2 border-l border-gray-300">
                <label className="block text-gray-500 text-xs font-bold">Check out</label>
                <input
                    type="text"
                    placeholder="Add dates"
                    className="bg-transparent outline-none w-full text-gray-700 text-sm"
                />
            </div>
            <div className="flex-1 p-2 border-l border-gray-300">
                <label className="block text-gray-500 text-xs font-bold">Who</label>
                <input
                    type="text"
                    placeholder="Add guests"
                    className="bg-transparent outline-none w-full text-gray-700 text-sm"
                />
            </div>
            <button className='mx-2'>
                <svg width="45" height="45" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="60" height="60" rx="30" fill="#FF385C" />
                    <path d="M40.725 40.725L36.6 36.6" stroke="white" stroke-width="1.98" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M21.75 27.525C21.75 25.9934 22.3584 24.5245 23.4415 23.4415C24.5245 22.3584 25.9934 21.75 27.525 21.75" stroke="white" stroke-width="1.98" stroke-miterlimit="10" />
                    <path d="M27.525 36.6C32.537 36.6 36.6 32.537 36.6 27.525C36.6 22.513 32.537 18.45 27.525 18.45C22.513 18.45 18.45 22.513 18.45 27.525C18.45 32.537 22.513 36.6 27.525 36.6Z" stroke="white" stroke-width="1.98" stroke-miterlimit="10" stroke-linecap="square" />
                </svg>
            </button>
        </div>
    )
}

export default SearchandSet
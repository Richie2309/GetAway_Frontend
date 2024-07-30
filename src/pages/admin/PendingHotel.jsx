import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getHotelData } from '../../api/admin';

const PendingHotel = () => {
  const [hotels, setHotels] = useState([])
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await getHotelData();
        const pendingHotels = response.data.filter(hotel => !hotel.isverified);
        setHotels(pendingHotels);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };
    fetchHotelData();
  }, []);

  const handleRowClick = (hotelId) => {
    navigate(`/admin/hotel-management/${hotelId}`);
  };

return (
  <section className="bg-zinc-100 p-3 sm:p-5 w-full h-screen font-poppins">
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-black">Admin</h1>
    </header>
    <nav className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-t-lg mt-4">
      <ul className="flex space-x-4">
        <li className="font-semibold">Accommodation Management - Pending Verifications</li>
      </ul>
    </nav>
    <div className="bg-zinc-100 mx-auto max-w-screen-xl mt-4">
      <div className="relative overflow-hidden bg-white shadow-md sm:rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 pb-4 pt-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center ml-1">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.9 14.32a8 8 0 111.414-1.415l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>

        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase text-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-1 py-3 text-center">
                  S.No
                </th>

                <th scope="col" className="px-4 py-3 text-center">
                  Accommodation
                </th>

              </tr>
            </thead>
            <tbody>
                {hotels.map((hotel, index) => (
                  <tr
                    key={hotel._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                    onClick={() => handleRowClick(hotel._id)}
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{hotel.title}</td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4">
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Previous
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Next
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
);
}

export default PendingHotel
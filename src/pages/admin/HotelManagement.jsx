import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHotelData } from '../../api/admin';


const HotelManagement = () => {
  const [hotels, setHotels] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; 

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await getHotelData();
        const verifiedHotels = response.data.filter(hotel => hotel.isverified);
        setHotels(verifiedHotels);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };
    fetchHotelData();
  }, []);


  // const handleBlockUnblock = async (hotelId) => {
  //   // try {
  //   //   const response = await toggleBlockHotel(hotelId);
  //   //   const updatedHotel = response.data;

  //   //   setHotels((prevHotels) =>
  //   //     prevHotels.map((hotel) =>
  //   //       hotel._id === updatedHotel._id ? updatedHotel : hotel
  //   //     )
  //   //   );
  //   // } catch (error) {
  //   //   console.error('Error toggling block status:', error);
  //   // }
  // };

  const filteredHotels = hotels.filter(hotel =>
    hotel.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageHotels = filteredHotels.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className="bg-zinc-100 p-3 sm:p-5 w-full h-screen font-poppins">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-black">Admin</h1>
      </header>
      <nav className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-t-lg mt-4">
        <ul className="flex space-x-4">
          <li className="font-semibold">Accommodation Management</li>
        </ul>
      </nav>
      <div className="bg-zinc-100 mx-auto max-w-screen-xl mt-4">
        <div className="relative overflow-hidden bg-white shadow-md sm:rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 pt-4 ml-1">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                  />

                </div>
              </form>
            </div>

          </div>
          <button
            className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4 mb-4 ml-1"
          >
            <Link to='/admin/hotel-management/pending'>
              <li className="flex items-center p-1 bg-secondary text-secondary-foreground rounded-lg">
                Pending Verifications
              </li>
            </Link>
          </button>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase text-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    S.No
                  </th>

                  <th scope="col" className="px-4 py-3">
                    Accommodation
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                  {/* <th scope="col" className="px-4 py-3">
                    Actions
                  </th> */}

                </tr>
              </thead>
              <tbody>
                {currentPageHotels.map((hotel, index) => (
                  <tr key={hotel._id}>
                    <td className="px-4 py-3">{startIndex + index + 1}</td>
                    <td className="px-4 py-3">{hotel.title}</td>
                    <td className="px-4 py-3">{hotel.isverified ? 'Verified' : 'Not Verified'}</td>
                    {/* <td className="px-4 py-3">
                      <button
                        onClick={() => handleBlockUnblock(hotel._id)}
                        className={`px-3 py-2 rounded ${hotel.isBlocked ? 'bg-red-500' : 'bg-green-500'} text-white`}
                      >
                        {hotel.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => handlePageChange('prev')}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
              disabled={currentPage === 1}
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
            </button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange('next')}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
              disabled={currentPage === totalPages}
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
            </button>
          </div>
        </div>
      </div>
    </section>
  );


}

export default HotelManagement


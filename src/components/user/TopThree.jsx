import React, { useEffect, useState } from 'react';
import { getTopThreeAccommodations } from '../../api/user';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TopThree = () => {
  const [accommodations, setAccommodations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const data = await getTopThreeAccommodations();
        setAccommodations(data);
      } catch (error) {
        console.error('Failed to fetch top accommodations', error);
      }
    };

    fetchAccommodations();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/hotel/${id}`); // Redirect to the hotel detail page using the hotel ID
  };

  return (
    <div className="bg-white rounded-2xl">
      <motion.div
        className="relative p-8 "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: '85%', margin: '0 auto' }} // Adjust width to 75% and centered
      >
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Best Accommodations of the Month</h1>
      <p className="text-gray-600 mb-8 text-center mx-auto">
        Experience fantastic benefits and obtain better rates when you make a direct booking on our official website.
      </p>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8" style={{ maxWidth: '90%' }}>
        {accommodations.length > 0 ? (
          accommodations.map((accommodation, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-xl shadow-[0_10px_15px_rgba(0,0,0,0.1),_0_4px_6px_rgba(0,0,0,0.1)] overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleNavigate(accommodation._id)}
            >
              <img
                className="w-full h-56 object-cover rounded-xl"
                src={accommodation.photos[0] || 'https://placehold.co/600x400'}
                alt={accommodation.title}
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{accommodation.title}</h2>
                <div className="flex items-center mb-2">
                  <span className="text-gray-600 mr-2">👤</span>
                  <span className="text-gray-700">{accommodation.maxGuests} guests</span>
                </div>
                <p className="text-gray-600 mb-4">
                  {accommodation.bedrooms} bedrooms, {accommodation.beds} beds
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold">
                    ₹{accommodation.price_per_night}
                    <span className="text-sm font-medium text-gray-500">/night</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500">
            No accommodations available at the moment.
          </div>
        )}
      </div>
      </motion.div>
    </div>
  );
};

export default TopThree;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyHotels } from '../../api/user';
import AccommodationCard from './AccommodationCard';

const MyAccommodations = () => {
  const [accommodations, setAccommodations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await getMyHotels();
        setAccommodations(response.data);
      } catch (error) {
        console.error("Error fetching accommodations", error);
      }
    };

    fetchAccommodations();
  }, []);

  const handleEdit = (hotelId) => {
    navigate(`/profile/accommodations/add-hotel/${hotelId}`);
  };



  return (
    <div className="max-w-4xl mx-auto font-poppins">
      <h2 className="text-2xl font-bold mb-4">My Accommodations</h2>
      <Link to="/profile/accommodations/add-hotel">
        <button className="w-full bg-red-400 text-white py-2 rounded-lg mb-4">
          + Add New Place
        </button>
      </Link>
      <div className="space-y-4">
        {accommodations.map((accommodation, index) => (
          <AccommodationCard key={index} {...accommodation}
          onEdit={() => handleEdit(accommodation._id)} />
        ))}
      </div>
    </div>
  );
};

export default MyAccommodations;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyHotels } from '../../api/user';
import AccommodationCard from './AccommodationCard';
import chatIcon from '../../assets/chat.jpg';
import HostChatScreen from './HostChatScreen';
import { MdClose } from 'react-icons/md';

const MyAccommodations = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // const handleDelete = async (hotelId) => {
  //   // navigate(`/profile/accommodations/add-hotel/${hotelId}`);
  // };

  const handleBookingHistory = (hotelId) => {
    navigate(`/profile/accommodations/bookings/${hotelId}`);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="max-w-4xl mx-auto font-poppins">
      <h2 className="text-2xl font-bold mb-4">My Accommodations</h2>

      <div className='grid grid-cols-12 gap-2 mb-4' >
        <Link to="/profile/accommodations/add-hotel" className='col-span-11'>
          <button className="w-full bg-red-400 text-white py-2 rounded-lg ">
            + Add New Place
          </button>
        </Link>
        <div className='col-span-1 flex items-center justify-center'>
          <img src={chatIcon} alt="" className='w-12 h-12 cursor-pointer' onClick={toggleModal} />
        </div>
      </div>

      <div className="space-y-4">
        {accommodations.map((accommodation, index) => (
          <AccommodationCard key={index} {...accommodation}
            onEdit={() => handleEdit(accommodation._id)}
            // onDelete={() => handleDelete(accommodation._id)}
            onBookingHistory={() => handleBookingHistory(accommodation._id)}
          />
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <button
            className="absolute top-7 right-7 bg-white rounded-full p-1"
            onClick={toggleModal}
          >
            <MdClose size={30} className='text-red-400' />

          </button>
          <div className="relative bg-white p-4 rounded-lg shadow-lg w-full max-w-5xl h-5/6 mx-4 overflow-y-auto">
            <HostChatScreen />
          </div>
        </div>
      )}

    </div>
  );
};

export default MyAccommodations;

import React, { useEffect, useState } from 'react';
import { getBookedHotels } from '../../api/user'
import Loading from '../../components/user/Loading';
import { MdOutlineChat } from 'react-icons/md';
import { ChatScreen } from '../../components/user/ChatScreen';

const MyBookings = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHostId, setSelectedHostId] = useState(null);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await getBookedHotels();

        setAccommodations(response.data);
      } catch (error) {
        console.error("Error fetching accommodations", error);
        setError('Error fetching accommodations');
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  const handleChatIconClick = (hostId) => {
    setSelectedHostId(hostId); 
    setIsModalOpen(true); 
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="max-w-4xl mx-auto font-poppins">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <div className="space-y-4 ">
        {accommodations.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          accommodations.map((accommodation, index) => (
            <div key={index} className="relative bg-gray-200 rounded-lg shadow-xl flex items-center h-32 space-x-6">
              <img src={accommodation.accommodation.photos[0]} alt={accommodation.accommodation.title} className="w-48 h-32 object-cover rounded-xl shadow-lg" />
              <div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold">{accommodation.accommodation.town}, {accommodation.accommodation.district}, {accommodation.accommodation.state}</h3>
                    <p className="text-sm text-gray-600">
                      {accommodation.guests} guests <br />
                      {accommodation.accommodation.bedrooms} bedrooms, {accommodation.accommodation.beds} bed <br />
                      Status: {accommodation.status}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 flex">
                    <div className='mr-5'>
                      <p>Total: ₹{accommodation.totalPrice}</p>
                      <p>Check-in: {new Date(accommodation.checkInDate).toLocaleDateString('en-GB')}</p>
                      <p>Check-out: {new Date(accommodation.checkOutDate).toLocaleDateString('en-GB')}</p>
                    </div>
                  </div>
                </div>
                <p className='text-xs mt-1'>#Cancellation available within 24hours of booking</p>
              </div>
              <div className="absolute bottom-2 right-2">
                <MdOutlineChat
                  size={22}
                  color='green'
                  onClick={() => handleChatIconClick(accommodation.accommodation.added_by)} />
              </div>
            </div>
          ))
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 h-3/4 max-w-4xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ChatScreen hostId={selectedHostId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
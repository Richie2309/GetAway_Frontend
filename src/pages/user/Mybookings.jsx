import React, { useEffect, useState } from 'react';
import { cancelBooking, getBookedHotels } from '../../api/user'
import Loading from '../../components/user/Loading';
import { MdClose, MdOutlineChat } from 'react-icons/md';
import { ChatScreen } from '../../components/user/ChatScreen';
import { message, Modal, Input, Button } from 'antd';

const MyBookings = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHostId, setSelectedHostId] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await getBookedHotels();
        setAccommodations(response.data);
      } catch (error) {
        console.error("Error fetching accommodations", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  const canCancelBooking = (bookedAt) => {
    if (!bookedAt) return false;
    const bookingTime = new Date(bookedAt);
    const currentTime = new Date();
    const timeDiff = currentTime - bookingTime;
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    return hoursDiff <= 24;
  };

  const handleCancelBooking = async () => {
    if (!cancellationReason.trim()) {
      message.error('Please provide a reason for cancellation.');
      return;
    }

    setIsCancelling(true);
    try {
      const response = await cancelBooking(selectedBookingId, cancellationReason);
      if (response.status === 200) {
        setAccommodations(prevAccommodations => {
          const updatedAccommodations = prevAccommodations.map(acc =>
            acc._id === selectedBookingId ? { ...acc, isCancelled: true } : acc
          );
          return [...updatedAccommodations];
        });
        message.success('Booking cancelled successfully. A refund will be initiated.');
        setIsCancelModalOpen(false);
        setCancellationReason('');
      }
    } catch (error) {
      console.error("Error cancelling booking", error);
      message.error("Failed to cancel booking. Please try again or contact support.");
    } finally {
      setIsCancelling(false);
    }
  }

  const handleChatIconClick = (hostId) => {
    setSelectedHostId(hostId);
    setIsModalOpen(true);
  };

  const showCancelConfirmation = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsCancelModalOpen(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto font-poppins">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <div className="space-y-4">
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
                {canCancelBooking(accommodation.bookedAt) ? (
                  <p className="text-xs mt-1">Cancellation available within 24 hours of booking.</p>
                ) : (
                  <p className="text-xs mt-1 text-red-400">Cancellation not available after 24 hours of booking.</p>
                )}
              </div>
              <div className="absolute bottom-2 right-2 flex items-center gap-3">
                <MdOutlineChat
                  size={24}
                  color="green"
                  onClick={() => handleChatIconClick(accommodation.accommodation.added_by)}
                />
                {accommodation.isCancelled ? (
                  <span className="text-xs text-red-600">Cancelled</span>
                ) : (
                  canCancelBooking(accommodation.bookedAt) && (
                    <button
                      className="text-xs text-red-600 p-2 rounded-full shadow-lg"
                      onClick={() => showCancelConfirmation(accommodation.bookingId)}
                    >
                      Cancel
                    </button>
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 h-3/4 max-w-4xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-7 right-7 bg-white rounded-full p-1">
              <MdClose size={30} className='text-red-400' />
            </button>
            <ChatScreen hostId={selectedHostId} />
          </div>
        </div>
      )}
      <Modal
        title="Cancel Booking"
        open={isCancelModalOpen}
        onOk={handleCancelBooking}
        onCancel={() => {
          setIsCancelModalOpen(false);
          setCancellationReason('');
        }}
        footer={[
          <Button key="cancel" onClick={() => setIsCancelModalOpen(false)} disabled={isCancelling}>
            No, Keep Booking
          </Button>,
          <Button
            key="ok"
            type="primary"
            onClick={handleCancelBooking}
            loading={isCancelling}
          >
            Yes, Cancel
          </Button>,
        ]}
      >
        <p>Are you sure you want to cancel this booking?</p>
        <Input.TextArea
          placeholder="Please provide a reason for cancellation"
          value={cancellationReason}
          onChange={(e) => setCancellationReason(e.target.value)}
          rows={4}
          className="mt-4"
          disabled={isCancelling}
        />
      </Modal>
    </div>
  );
};

export default MyBookings;
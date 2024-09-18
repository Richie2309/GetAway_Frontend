import React, { useEffect, useState } from 'react'
import { getSchedule } from '../../api/user';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'antd';


const GuestManagement = () => {
  const { hotelId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getSchedule(hotelId);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching booking details', error);
      }
    };

    fetchBookings();
  }, [hotelId]);

  const showModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedBooking(null);
  };

  return (
    <div className="bg-blue-100 p-8 rounded-lg">
      <table className="table-auto w-full text-left">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-2">Guest Name</th>
            <th className="px-4 py-2">Check-in Date</th>
            <th className="px-4 py-2">Check-out Date</th>
            <th className="px-4 py-2">Total Price</th>
            <th className="px-4 py-2">Number of Guests</th>
            <th className="px-4 py-2">Booking Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} onClick={() => showModal(booking)} className="cursor-pointer hover:bg-blue-200">
              <td className="px-4 py-2">{booking.user.fullName}</td>
              <td className="px-4 py-2">{new Date(booking.checkInDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">{booking.totalPrice}</td>
              <td className="px-4 py-2">{booking.guests}</td>
              <td className="px-4 py-2">{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedBooking && (
        <Modal
          title="Booking Details"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="close" onClick={handleCancel}>
              Close
            </Button>
          ]}
        >
          <p><strong>Guest Name:</strong> {selectedBooking.user.fullName}</p>
          <p><strong>Check-in Date:</strong> {new Date(selectedBooking.checkInDate).toLocaleDateString()}</p>
          <p><strong>Check-out Date:</strong> {new Date(selectedBooking.checkOutDate).toLocaleDateString()}</p>
          <p><strong>Total Price:</strong> ₹{selectedBooking.totalPrice}</p>
          <p><strong>Number of Guests:</strong> {selectedBooking.guests}</p>
          <p><strong>Booking Status:</strong> {selectedBooking.status}</p>
          <p><strong>Booked At:</strong> {new Date(selectedBooking.bookedAt).toLocaleString()}</p>
          
          {selectedBooking.status === 'Cancelled' && selectedBooking.cancellationReason && (
            <p><strong>Cancellation Reason:</strong> {selectedBooking.cancellationReason}</p>
          )}
        </Modal>
      )}
    </div>
  )
}

export default GuestManagement
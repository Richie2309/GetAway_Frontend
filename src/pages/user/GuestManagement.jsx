import React, { useEffect, useState } from 'react'
import { getSchedule } from '../../api/user';
import { useParams } from 'react-router-dom';


const GuestManagement = () => {
  const { hotelId } = useParams();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {      
    const fetchBookings = async () => {
      try {
        const response = await getSchedule(hotelId);
        console.log('res',response.data);
        
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching booking details', error);
      }
    };

    fetchBookings();
  }, [hotelId]);

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
            <tr key={booking._id}>
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
    </div>
  )
}

export default GuestManagement
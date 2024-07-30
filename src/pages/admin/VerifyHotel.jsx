import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { approveHotel, getHotelById, rejectHotel } from '../../api/admin';

const VerifyHotel = () => {
  const { hotelId } = useParams();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showReasonInput, setShowReasonInput] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await getHotelById(hotelId);
        setHotelDetails(response.data);
      } catch (error) {
        console.log('Error fetching hotel details', error);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  const handleReject = async () => {
    if (rejectionReason.trim() === '') {
      alert('Please provide a rejection reason.');
      return;
    }

    try {
      await rejectHotel({ hotelId, rejectionReason });
      alert('Hotel rejected successfully');

    } catch (error) {
      console.error('Error rejecting hotel:', error);
    }
  };

  const handleApprove = async () => {
    try {
      await approveHotel(hotelId); // You need to implement this
      alert('Hotel approved successfully');

navigate('/admin/hotel-management')
    } catch (error) {
      console.error('Error approving hotel:', error);
    }
  };
  // Return loading state if hotel details are not yet loaded
  if (!hotelDetails) return <div>Loading...</div>;

  // Destructure necessary fields from hotelDetails
  const {
    title,
    description,
    photos = [],
    added_by: { fullName, email, phone, id_proof, ifsc_code, bank_account_number } = {},
    checkInTime,
    checkOutTime,
    maxGuests,
    beds,
    price_per_night
  } = hotelDetails;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Personal info</h2>
        <div className="mb-4">
          <p><span className="font-semibold">Full name:</span> {fullName}</p>
          <p><span className="font-semibold">Email:</span> {email}</p>
          <p><span className="font-semibold">Phone:</span> {phone}</p>
        </div>

        <h3 className="text-xl font-bold mb-2">Identity verification</h3>
        <div className="mb-4">
          {id_proof && id_proof.length > 0 && (
            <img src={id_proof[0]} alt="Identity verification" className="w-full h-32 object-cover" />
          )}
        </div>

        <div className="mb-4">
          <p><span className="font-semibold">Bank details</span></p>
          <p>Account number: {bank_account_number}</p>
          <p>IFSC code: {ifsc_code}</p>
        </div>

        <h2 className="text-2xl font-bold mb-4">{title}</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Hotel image ${index + 1}`} className="w-full h-48 object-cover rounded" />
          ))}
        </div>

        <p className="mb-4">
          {description}
        </p>

        <div className="mb-4">
          <p><span className="font-semibold">Check-in:</span> {checkInTime}</p>
          <p><span className="font-semibold">Check-out:</span> {checkOutTime}</p>
          <p><span className="font-semibold">Max guests:</span> {maxGuests}</p>
          <p><span className="font-semibold">Beds:</span> {beds}</p>
          <p><span className="font-semibold">Price per night:</span> ${price_per_night}</p>
        </div>

        <div className="flex justify-between mb-8">
          <button onClick={handleApprove} className="bg-green-500 text-white px-4 py-2 rounded">Approve</button>
          <button onClick={() => setShowReasonInput(true)} className="bg-red-500 text-white px-4 py-2 rounded">Reject</button>
        </div>

        {showReasonInput && (
          <div className="mb-4">
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows="4"
              placeholder="Enter reason for rejection"
              className="w-full border border-gray-300 p-2 rounded"
            />
            <button onClick={handleReject} className="bg-red-500 text-white px-4 py-2 rounded mt-2">Submit Reason</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyHotel;

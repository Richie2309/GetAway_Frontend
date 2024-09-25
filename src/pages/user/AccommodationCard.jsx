import React from 'react'
import { MdAccessTime, MdCreate, MdError } from "react-icons/md";

const AccommodationCard = ({ photos, town, district, state, maxGuests, bedrooms, beds, price_per_night, isverified, rejectionReason, onEdit, onBookingHistory }) => {

  const renderVerificationStatus = () => {
    if (isverified) {
      return (
        <div>
          <button className="text-yellow-500 mx-2" onClick={onBookingHistory}>
            <MdAccessTime className='text-lg' />
          </button>
          <button className="text-blue-500 mx-2" onClick={onEdit}>
            <MdCreate className='text-lg' />
          </button>
        </div>
      );
    } else if (rejectionReason) {
      return (
        <div className="mt-4 text-red-500">
          <p className="font-bold flex items-center"><MdError className="mr-2" /> Rejected</p>
          <p className="text-sm">Reason: {rejectionReason}</p>
        </div>  
      );
    } else {
      return <span className="text-yellow-600 text-sm">Verification pending ⏳</span>;
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg flex items-center h-32 space-x-6 shadow-xl font-poppins">
      <img src={photos[0]} alt={town} className="w-48 h-32 object-cover rounded-xl shadow-lg" />
      <div className="flex-grow">
        <h3 className="font-semibold">{town}, {district}, {state}</h3>
        <p className="text-sm text-gray-600">
          {maxGuests} guests, <br />{bedrooms} bedrooms, {beds} bed
        </p>
        <p className="text-sm font-semibold">${price_per_night} per night</p>
      </div>
      {renderVerificationStatus()}
    </div>
  )
}

export default AccommodationCard
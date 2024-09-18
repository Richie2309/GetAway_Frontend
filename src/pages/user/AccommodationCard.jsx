import React from 'react'
import { MdAccessTime, MdCreate } from "react-icons/md";

const AccommodationCard = ({ photos, town, district, state, maxGuests, bedrooms, beds, price_per_night, isverified, onEdit, onBookingHistory }) => {

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
      {!isverified ? (
        <span className="text-yellow-600 text-sm">Verification pending ⏳</span>
      ) : (
        <div>
          <button className="text-yellow-500 mx-2" onClick={onBookingHistory}>
            <MdAccessTime className='text-lg' />
          </button>
          <button className="text-blue-500 mx-2" onClick={onEdit}>
            <MdCreate className='text-lg' />
          </button>
          {/* <button className="text-red-500 mx-2" onClick={onDelete}>
            <MdDeleteOutline className='text-lg' />
          </button> */}
        </div>
      )}
    </div>
  )
}

export default AccommodationCard
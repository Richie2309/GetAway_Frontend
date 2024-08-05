import React from 'react'

const AccommodationCard = ({ photos, town, district,state, maxGuests, bedrooms, beds, price_per_night, isverified, onEdit }) => {

  return (
    <div className="bg-gray-100 rounded-lg pt-4 flex items-center space-x-6 font-poppins">
      <img src={photos[0]} alt={town} className="w-48 h-32 object-cover rounded-lg" />
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
          <button className="text-blue-500 text-sm mr-2" onClick={onEdit}>Edit</button>
          <button className="text-red-500 text-sm">Delete</button>
        </div>
      )}
    </div>
  )
}

export default AccommodationCard
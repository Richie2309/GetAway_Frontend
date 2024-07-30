import React from 'react';
import { Link } from 'react-router-dom';

const AccommodationCard = ({ image, location, guests, bedrooms, beds, price, isPending }) => (
  <div className="bg-gray-100 rounded-lg p-4 flex items-center space-x-4 font-poppins">
    <img src={image} alt={location} className="w-32 h-24 object-cover rounded-lg" />
    <div className="flex-grow">
      <h3 className="font-semibold">{location}</h3>
      <p className="text-sm text-gray-600">
        {guests} guests, {bedrooms} bedrooms, {beds} beds
      </p>
      <p className="text-sm font-semibold">${price} per night</p>
    </div>
    {isPending && (
      <span className="text-yellow-600 text-sm">Verification pending ⏳</span>
    )}
    {!isPending && (
      <div>
        <button className="text-blue-500 text-sm mr-2">Edit</button>
        <button className="text-red-500 text-sm">Delete</button>
      </div>
    )}
  </div>
);

const MyAccommodations = () => {
  const accommodations = [
    {
      image: "path_to_image1.jpg",
      location: "Thalassery, Kerala",
      guests: 4,
      bedrooms: 2,
      beds: 2,
      price: 8000,
      isPending: true
    },
    {
      image: "path_to_image2.jpg",
      location: "Thalassery, Kerala",
      guests: 4,
      bedrooms: 2,
      beds: 2,
      price: 8000,
      isPending: false
    }
  ];

  return (
    <div className="max-w-2xl mx-auto font-poppins">
      <h2 className="text-2xl font-bold mb-4">My Accommodations</h2>
      <Link to="/profile/accommodations/add-hotel">
        <button className="w-full bg-red-400 text-white py-2 rounded-lg mb-4">
          + Add New Place
        </button>
      </Link>
      <div className="space-y-4">
        {accommodations.map((accommodation, index) => (
          <AccommodationCard key={index} {...accommodation} />
        ))}
      </div>
    </div>
  );
};

export default MyAccommodations;
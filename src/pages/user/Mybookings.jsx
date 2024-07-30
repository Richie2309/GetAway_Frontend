import React from 'react';

const BookingCard = ({ image, location, guests, bedrooms, beds, price }) => (
  <div className="bg-gray-100 rounded-lg p-4 flex items-center space-x-4 font-poppins">
    <img src={image} alt={location} className="w-40 h-28 object-cover rounded-lg" />
    <div className="flex-grow">
      <h3 className="font-semibold">{location}</h3>
      <p className="text-sm text-gray-600">
        {guests} guests, {bedrooms} bedrooms, {beds} beds
      </p>
      <p className="text-sm font-semibold">₹{price} per night</p>
    </div>
    <button className="bg-red-400 text-white px-3 py-1 rounded-full text-sm">
      Cancel
    </button>
  </div>
);

const MyBookings = () => {
  const booking = {
    image: "/path-to-your-image.jpg",
    location: "Thalassery, Kerala",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    price: 8000
  };

  return (
    // <div className='container mx-auto font-poppins mb-10'>

    <div className="max-w-2xl mx-auto font-poppins">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <BookingCard {...booking} />
    </div>
    // </div>
  );
};

export default MyBookings;
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { checkAvailability, createBooking, createPaymentIntent, getHotelData } from '../../api/user';
import { FaParking, FaSnowflake, FaTv, FaWifi } from 'react-icons/fa';
import Loading from '../../components/user/Loading';
import { IoMdClose, IoMdPhotos } from "react-icons/io";
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../components/user/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import BooingSuccess from '../../components/user/BooingSuccess';
import LocationMap from '../../components/user/LocationMap';

const stripePromise = loadStripe('pk_test_51PkPSb2LBaBhNuTqpKiEL1NojZ3qHIbQFmS6DKRZ5lX1UQVoQ4Nzk5Aur1VPka9tiPdoNgYgKudBhZf31QaZ6UWx00n7Qqf78z');

const SingleRoom = () => {
  const { id } = useParams()
  const [hotelData, setHotelData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(null);
  const [error, setError] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {

    const fetchHotelData = async () => {
      try {
        const response = await getHotelData(id);
        console.log('res', response.data);

        setHotelData(response.data.hotel);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [id]);

  const handleAvailabilityCheck = async () => {
    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates.');
      return;
    }
    try {
      const available = await checkAvailability(id, checkIn, checkOut);
      setIsAvailable(available);
      if (!available) {
        setError('This slot is not available for the selected dates.');
      } else {
        setError('');
      }
    } catch (err) {
      setError('Error checking availability. Please try again.');
    }
  };

  const handlePayment = async () => {
    if (!isAvailable) return;
    try {
      const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
      const amount = hotelData.price_per_night * nights;
      const response = await createPaymentIntent(amount);
      setClientSecret(response.data.clientSecret);
      setShowPayment(true);
    } catch (error) {
      setError('An error occurred while initializing payment. Please try again.');
    }
  };

  const handleBookingSuccess = async () => {
    try {
      const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
      const amount = hotelData.price_per_night * nights;
      await createBooking(id, checkIn, checkOut, guests, amount);
      console.log('Booking created successfully');
      setBookingSuccess(true);
    } catch (error) {
      setError('Failed to create booking. Please contact support.');
    }
  };


  if (loading) {
    return <Loading />
  }

  if (!hotelData) {
    return <div>Hotel not found</div>;
  }

  if (bookingSuccess) {
    return (
      <BooingSuccess />
    );
  }

  if (showAllPhotos) {
    return (
      <div className='flex flex-col absolute inset-0 bg-black min-h-screen'>
        <div className='bg-black p-8 grid gap-4'>
          <div className='w-full flex'>
            <button onClick={() => setShowAllPhotos(false)} className='fixed right-12 top-8 flex py-2 px-4 bg-white rounded-2xl'><IoMdClose /></button>
          </div>
          {hotelData?.photos?.length > 0 && hotelData.photos.map((photo, index) => (
            <div key={index} className='flex justify-center'>
              <img src={photo} alt="" className='w-2/3 object-cover' />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 font-poppins">
      <h1 className="text-3xl font-bold mb-4">{hotelData.title}</h1>
      <div className='relative'>
        <div className="grid gap-2 mb-4 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
          <div>
            <img src={hotelData.photos[0]} alt={hotelData.title} className="aspect-square object-cover" />
          </div>

          <div className="grid">
            <div>
              <img src={hotelData.photos[1]} alt={hotelData.title} className="aspect-square object-cover" />
            </div>
            <div className='overflow-hidden'>
              <img src={hotelData.photos[2]} alt={hotelData.title} className="aspect-square object-cover relative top-2" />
            </div>
          </div>
        </div>
        <button onClick={() => setShowAllPhotos(true)} className='absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500 flex items-center gap-1'>
          <IoMdPhotos />
          Show more photos
        </button>

      </div>

      <div className="flex gap-3">
        <div className="flex-grow">
          <div className="mt-4">
            <h2 className="font-semibold my-2 text-2xl">Description</h2>
            <p className="text-sm mb-4">{hotelData.description}</p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div>
              <p><strong>Check-in time:</strong> {hotelData.checkInTime}</p>
              <p><strong>Check-out time:</strong> {hotelData.checkOutTime}</p>
              <p><strong>Max guests:</strong> {hotelData.maxGuests}</p>
              <p><strong>Bedrooms:</strong> {hotelData.bedrooms}</p>
              <p><strong>Beds:</strong> {hotelData.beds}</p>
              <p><strong>Bathrooms:</strong> {hotelData.bathrooms}</p>
              <h3 className="font-semibold mt-4 mb-6">Perks</h3>
              <div className="flex items-center space-x-6">
                {hotelData.perks.includes('Wifi') && <span className="ml-2"><FaWifi /> Wifi</span>}
                {hotelData.perks.includes('Parking') && <span className="ml-2"><FaParking /> Free Parking</span>}
                {hotelData.perks.includes('TV') && <span className="ml-2"><FaTv /> TV</span>}
                {hotelData.perks.includes('AC') && <span className="ml-2"><FaSnowflake /> AC</span>}
              </div>
            </div>
            <div>
              {/* Checkout */}
              <div className='bg-white shadow p-4 rounded-2xl'>
                <div className='text-2xl text-center'>
                  Price ₹{hotelData.price_per_night}/per night
                </div>
                <div className='border rounded-2xl mt-4'>
                  <div className="flex">
                    <div className='py-2 px-4'>
                      <label>Check in</label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                      />
                    </div>
                    <div className='py-2 px-4 border-l'>
                      <label>Check out</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='py-2 px-4 border-t'>
                    <label>Number of guests</label>
                    <select
                      className="w-full border rounded px-2 py-1"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                    >
                      {[...Array(hotelData.maxGuests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {showPayment && clientSecret ? (
                  <Elements stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} onSuccess={handleBookingSuccess} />
                  </Elements>
                ) : (
                  <button
                    className="w-full bg-red-500 text-white py-2 rounded mt-4"
                    onClick={isAvailable ? handlePayment : handleAvailabilityCheck}
                  >
                    {isAvailable ? 'Proceed to Payment' : 'Check Availability'}
                  </button>
                )}
              </div>
            </div>
          </div>
          <h3 className="font-semibold mt-4 mb-2">Location</h3>
          <p className="text-sm">{hotelData.town}, {hotelData.district}, {hotelData.state}</p>
          <p className="text-sm">{hotelData.address}</p>
          {hotelData.latitude && hotelData.longitude && (
            <div className="my-4">
              <LocationMap latitude={hotelData.latitude} longitude={hotelData.longitude} />
            </div>
          )}
        </div>

      </div>

      {/* Reviews */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">5 reviews</h2>
        <div className="mb-4">
          <p className="font-semibold">Bharati</p>
          <div className="flex mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-gray-600">April 2023</p>
          <p className="text-sm mt-1">The place was awesome, had a peaceful sleep and people were so kind and helpful. Food(Dinner) was yummy and breakfast was so satisfying with pure cow milk chai.. just lov.</p>
        </div>
        <button className="text-blue-500">Show more</button>
      </div>
    </div>

  );
}

export default SingleRoom
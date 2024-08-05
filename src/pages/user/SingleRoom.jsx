import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getHotelData } from '../../api/user';
import { FaParking, FaSnowflake, FaTv, FaWifi } from 'react-icons/fa';
import Loading from '../../components/user/Loading';
import { IoMdClose, IoMdPhotos } from "react-icons/io";

const SingleRoom = () => {
  const { id } = useParams()
  const [hotelData, setHotelData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await getHotelData(id);
        setHotelData(response.data.hotel);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [id]);

  if (loading) {
    return <Loading />
  }

  if (!hotelData) {
    return <div>Hotel not found</div>;
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
              <div className='bg-white shadow p-4 rounded-2xl'>
                <div className='text-2xl text-center'>
                  Price ₹{hotelData.price_per_night}/per night
                </div>
                <div className='border rounded-2xl mt-4'>
                  <div className="flex">
                    <div className='py-2 px-4'>
                      <label>Check in</label>
                      <input type="date" />
                    </div>
                    <div className='py-2 px-4 border-l'>
                      <label>Check out</label>
                      <input type="date" />
                    </div>
                  </div>
                  <div className='py-2 px-4 border-t'>
                    <label>Number of guests</label>
                    <select className="w-full border rounded px-2 py-1">
                      {[...Array(hotelData.maxGuests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button className="w-full bg-red-500 text-white py-2 rounded mt-1">Book</button>
              </div>
            </div>
          </div>




          <h3 className="font-semibold mt-4 mb-2">Location</h3>
          <p className="text-sm">{hotelData.town}, {hotelData.district}, {hotelData.state}</p>
          <p className="text-sm">{hotelData.address}</p>
        </div>

        {/* <div className="border p-4 rounded-lg w-2/5">
          <p className="font-bold text-xl mb-2">Price ₹{hotelData.price_per_night}/per night</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              <label className="text-sm">Check in:</label>
              <input type="date" className="w-full border rounded px-2 py-1" />
            </div>
            <div>
              <label className="text-sm">Check out:</label>
              <input type="date" className="w-full border rounded px-2 py-1" />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm">Number of guests:</label>
            <select className="w-full border rounded px-2 py-1">
              {[...Array(hotelData.maxGuests)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <button className="w-full bg-red-500 text-white py-2 rounded">Book</button>
        </div> */}
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
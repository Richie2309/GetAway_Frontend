import React, { useEffect, useState } from 'react'
import { getAllHotels } from '../../api/user'
import { useSelector } from 'react-redux'
import { FaHeart } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import Loading from '../../components/user/Loading'

const Explore = () => {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState({});
  const isAuthenticated = useSelector(state => state.userAuth.isAuthenticated);
  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const searchParams = {
          destination: searchQuery.get('destination'),
          checkIn: searchQuery.get('checkIn'),
          checkOut: searchQuery.get('checkOut'),
          guests: searchQuery.get('guests'),
        };

        const response = await getAllHotels(searchParams);
        console.log('response',response);
        
        setHotels(response.data.allHotels);
      } catch (err) {
        console.error('Error fetching hotels:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [location.search]);

  const toggleFavorite = (hotelId) => {
    setFavorites(prev => ({
      ...prev,
      [hotelId]: !prev[hotelId]
    }));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      {searchQuery.toString() && <h2 className="text-2xl font-semibold mb-4">{hotels.length} Places in {searchQuery.get('destination')}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel._id} className="relative bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/hotel/${hotel._id}`}>
              <img
                src={hotel.photos[0]}
                alt={`Image of ${hotel.title}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{hotel.title}</h3>
                <p className="text-zinc-600">{hotel.maxGuests} guests, {hotel.bedrooms} bedrooms, {hotel.beds} beds</p>
                <p className="text-black font-bold">₹{hotel.price_per_night} per night</p>
              </div>
            </Link>
            {isAuthenticated && (
              <button
                className="absolute top-2 right-2"
                onClick={() => toggleFavorite(hotel._id)}
              >
                <FaHeart
                  className={`w-6 h-6 ${favorites[hotel._id] ? 'text-red-500' : 'text-zinc-400'}`}
                />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore
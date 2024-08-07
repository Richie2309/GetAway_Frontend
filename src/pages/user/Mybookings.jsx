import React from 'react';

const MyBookings = () => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await getMyHotels();
        setAccommodations(response.data);
      } catch (error) {
        console.error("Error fetching accommodations", error);
      }
    };

    fetchAccommodations();
  }, []);

  // const handleEdit = (hotelId) => {
  //   navigate(`/profile/accommodations/add-hotel/${hotelId}`);
  // };

  return (
    <div className="max-w-4xl mx-auto font-poppins">
    <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
    <div className="space-y-4">
      {/* {accommodations.map((accommodation, index) => (
        <AccommodationCard key={index} {...accommodation}
        onEdit={() => handleEdit(accommodation._id)} />
      ))} */}
    </div>
  </div>
  );
};

export default MyBookings;
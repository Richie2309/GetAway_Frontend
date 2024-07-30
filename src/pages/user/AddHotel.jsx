import React, { useEffect, useState } from 'react';
import { FaCloudUploadAlt, FaWifi, FaParking, FaTv, FaSnowflake } from 'react-icons/fa';
import { addHotel, editHotel, getHotelData, getUserData } from '../../api/user';
import { useLocation } from 'react-router-dom';

const AddHotel = () => {
  const location = useLocation();
  const isEdit = location.pathname.includes('edit-hotel');
  const hotelId = new URLSearchParams(location.search).get('id');
  const [hotelData, setHotelData] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    town: '',
    state: '',
    pincode: '',
    address: '',
    description: '',
    photos: [],
    maxGuests: '',
    bathrooms: '',
    bedrooms: '',
    beds: '',
    wifi: false,
    parking: false,
    tv: false,
    ac: false,
    checkInTime: '',
    checkOutTime: '',
    price_per_night: '',
  });

  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState('');
  const [platformFee, setPlatformFee] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [userData, setUserData] = useState({});
  const [infoIncomplete, setInfoIncomplete] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData();
        const user = response.data.user;
        setUserData(user);

        if (!user.phone || !user.bank_account_number || !user.id_proof) {
          setInfoIncomplete(true);
        } else {
          setInfoIncomplete(false);
        }
        console.log(userData)
      } catch (err) {
        console.log('Error getting user data:', err);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchHotelData = async () => {
      if (isEdit && hotelId) {
        try {
          const response = await getHotelData(hotelId);
          const fetchedHotelData = response.data;
          setFormData(prevState => ({
            ...prevState,
            ...fetchedHotelData,
          }));
        } catch (err) {
          console.log('Failed to fetch hotel details:', err);
        }
      }
    };

    fetchHotelData();
  }, [isEdit, hotelId]);


  useEffect(() => {
    if (formData.price_per_night) {
      const price_per_night = parseFloat(formData.price_per_night);
      const fee = price_per_night * 0.1;
      setPlatformFee(fee.toFixed(2));
      setEarnings((price_per_night - fee).toFixed(2));
    } else {
      setPlatformFee(0);
      setEarnings(0);
    }
  }, [formData.price_per_night]);

  const handleImageUpload = (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    if (formData.photos.length + files.length > 7) {
      setImageError('You can upload a maximum of 7 photos.');
      return;
    }

    const newPhotos = [];

    for (const file of files) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          newPhotos.push(base64String);
          if (newPhotos.length === files.length) {
            setFormData(prevState => ({
              ...prevState,
              photos: [...prevState.photos, ...newPhotos]
            }));
            setImageError('');
          }
        }
        reader.readAsDataURL(file);
      } catch (err) {
        console.log('Error uploading image:', err);
        setImageError('Failed to upload image. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));

    // Clear the error for this field as the user types
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }

    // Special handling for title and description to show errors immediately if they exceed the limit
    if (name === 'title' && value.length > 32) {
      setErrors(prevErrors => ({
        ...prevErrors,
        title: "Title should not exceed 32 characters"
      }));
    }
    if (name === 'description' && value.length > 400) {
      setErrors(prevErrors => ({
        ...prevErrors,
        description: "Description should not exceed 400 characters"
      }));
    }
  };

  const validatePhotos = () => {
    if (formData.photos.length === 0) {
      setImageError('Please upload at least one image.');
      return false;
    }
    if (formData.photos.length > 7) {
      setImageError('You can upload a maximum of 7 photos.');
      return false;
    }
    setImageError('');
    return true;
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.title) tempErrors.title = "Title is required";
    else if (formData.title.length > 32) tempErrors.title = "Title should not exceed 32 characters";
    if (!formData.pincode) tempErrors.pincode = "Pincode is required";
    if (!formData.town) tempErrors.town = "Town is required";
    if (!formData.district) tempErrors.district = "District is required";
    if (!formData.state) tempErrors.state = "State is required";
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.description) tempErrors.description = "Description is required";
    else if (formData.description.length > 400) tempErrors.description = "Description should not exceed 400 characters";
    if (!formData.maxGuests) tempErrors.maxGuests = "Number of guests is required";
    if (!formData.bathrooms) tempErrors.bathrooms = "Number of bathrooms is required";
    if (!formData.bedrooms) tempErrors.bedrooms = "Number of bedrooms is required";
    if (!formData.beds) tempErrors.beds = "Number of beds is required";
    if (!formData.checkInTime) tempErrors.checkInTime = "Check-in time is required";
    if (!formData.checkOutTime) tempErrors.checkOutTime = "Check-out time is required";
    if (!formData.price_per_night) tempErrors.price_per_night = "Price is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validate();
    const arePhotosValid = validatePhotos();

    if (isFormValid && arePhotosValid) {
      try {
        //         const formDataToSend = new FormData();
        //         // Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));

        // console.log(formData);
        // console.log(formDataToSend);
        if (isEdit) {
          await editHotel({ ...formData, id: hotelId });
        } else {
          await addHotel(formData);
        }
        // Handle success (e.g., show a success message or redirect)

      } catch (err) {
        // Handle error (e.g., show an error message)

        console.log('Error submitting form:', err);
      }
    } else {
      console.log("Form has errors.");
    }
  };


  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md font-poppins">
      <h1 className="text-2xl font-bold mb-6">My Accommodations</h1>
      <h2 className="text-xl font-semibold mb-4">Add your place</h2>
      <div>
        <h6>Phone Number : {userData.phone ? 'Added✅' : 'Not added❌'}</h6>
        <h6>Bank Account : {userData.bank_account_number && userData.ifsc_code ? 'Added✅' : 'Not added❌'}</h6>
        <h6>Identity Verification : {userData.id_proof ? 'Added✅' : 'Not added❌'}</h6>
        {infoIncomplete && <p className="text-red-500 text-s mt-2">Please add/update above details in your account section</p>} <br />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <span className='text-xl font-semibold'>Title</span>
          <p className='mb-2'>Addtitle for your place. Should be short and catchy</p>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full border p-2 rounded shadow-slate-400 shadow-sm ${errors.title ? 'border-red-500' : ''}`}
            placeholder="Add title for your place"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <span className='text-xl font-semibold'>Address</span>
        <div className="mb-5 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
            <input
              type="number"
              name='pincode'
              value={formData.pincode}
              onChange={handleChange}
              className={`w-full border p-2 rounded shadow-slate-400 shadow-sm ${errors.pincode ? 'border-red-500' : ''}`}
            />
            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Town</label>
            <input
              type="text"
              name='town'
              value={formData.town}
              onChange={handleChange}
              className={`w-full border p-2 rounded shadow-slate-400 shadow-sm ${errors.town ? 'border-red-500' : ''}`}
            />
            {errors.town && <p className="text-red-500 text-xs mt-1">{errors.town}</p>}
          </div>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
            <input
              type="text"
              name='district'
              value={formData.district}
              onChange={handleChange}
              className={`w-full border p-2 rounded shadow-slate-400 shadow-sm ${errors.district ? 'border-red-500' : ''}`}
            />
            {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              type="text"
              name='state'
              value={formData.state}
              onChange={handleChange}
              className={`w-full border p-2 rounded shadow-slate-400 shadow-sm ${errors.state ? 'border-red-500' : ''}`}
            />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className={`w-full border p-2 rounded shadow-slate-400 shadow-sm ${errors.address ? 'border-red-500' : ''}`}
          ></textarea>
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        <div className="mb-5">
          <span className='text-xl font-semibold'>Photos</span>
          <p className='mb-2'>Add photos of your accommodation</p>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} accept='image/*' multiple />
                </label>
              </div>
            </div>
          </div>
          {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
          {/* Display uploaded photos */}
          <div className="mt-4 flex flex-wrap gap-4">
            {formData.photos.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Uploaded image ${index + 1}`}
                className="w-32 h-32 object-cover rounded-md"
              />
            ))}
          </div>
        </div>

        <div className="mb-5">
          <span className='text-xl font-semibold'>Description</span>
          <p className='mb-2'>Describe about your place</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className={`w-full border p-2 rounded shadow-slate-400 shadow-sm ${errors.description ? 'border-red-500' : ''}`}
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div className="mb-10 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Guests</label>
            <input
              type="number"
              name='maxGuests'
              value={formData.maxGuests}
              onChange={handleChange}
              className={`w-full border p-2 rounded shadow-slate-400 shadow-sm ${errors.maxGuests ? 'border-red-500' : ''}`}
            />
            {errors.maxGuests && <p className="text-red-500 text-xs mt-1">{errors.maxGuests}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
            <input
              type="number"
              name='bathrooms'
              value={formData.bathrooms}
              onChange={handleChange}
              className={`w-full border p-2 rounded shadow-slate-400 shadow-sm ${errors.bathrooms ? 'border-red-500' : ''}`}
            />
            {errors.bathrooms && <p className="text-red-500 text-xs mt-1">{errors.bathrooms}</p>}
          </div>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
            <input
              type="number"
              name='bedrooms'
              value={formData.bedrooms}
              onChange={handleChange}
              className={`w-full border p-2 rounded shadow-slate-400 shadow-sm ${errors.bedrooms ? 'border-red-500' : ''}`}
            />
            {errors.bedrooms && <p className="text-red-500 text-xs mt-1">{errors.bedrooms}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Beds</label>
            <input
              type="number"
              name='beds'
              value={formData.beds}
              onChange={handleChange}
              className={`w-full border p-2 rounded shadow-slate-400 shadow-sm ${errors.beds ? 'border-red-500' : ''}`}
            />
            {errors.beds && <p className="text-red-500 text-xs mt-1">{errors.beds}</p>}
          </div>
        </div>

        <div className="mb-10">
          <span className='text-xl font-semibold'>Perks</span>
          <p className='mb-2'>Select all the perks of your place</p>          <div className="mt-2 flex space-x-4">
            <label className="w-11/12 inline-flex items-center border p-2 rounded shadow-slate-400 shadow-sm">
              <input type="checkbox" name="wifi" checked={formData.wifi} onChange={handleChange} className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              <span className="ml-2"><FaWifi /> WiFi</span>
            </label>
            <label className="w-11/12 inline-flex items-center border p-2 rounded shadow-slate-400 shadow-sm">
              <input type="checkbox" name="parking" checked={formData.parking} onChange={handleChange} className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              <span className="ml-2"><FaParking /> Parking</span>
            </label>
            <label className="w-11/12 inline-flex items-center border p-2 rounded shadow-slate-400 shadow-sm">
              <input type="checkbox" name="tv" checked={formData.tv} onChange={handleChange} className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              <span className="ml-2"><FaTv /> TV</span>
            </label>
            <label className="w-11/12 inline-flex items-center border p-2 rounded shadow-slate-400 shadow-sm">
              <input type="checkbox" name="ac" checked={formData.ac} onChange={handleChange} className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              <span className="ml-2"><FaSnowflake /> AC</span>
            </label>
          </div>
        </div>

        <div className="mb-10">
          <span className='text-xl font-semibold'>Check in & out </span>
          <p className='mb-2'>Add check in and check out times</p>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <input
                type="time"
                name="checkInTime"
                value={formData.checkInTime}
                onChange={handleChange}
                className={`w-full border p-2 rounded shadow-slate-400 shadow-sm ${errors.checkInTime ? 'border-red-500' : ''}`}
              />
              {errors.checkInTime && <p className="text-red-500 text-xs mt-1">{errors.checkInTime}</p>}
            </div>
            <div>
              <input
                type="time"
                name="checkOutTime"
                value={formData.checkOutTime}
                onChange={handleChange}
                className={`w-full border p-2 rounded shadow-slate-400 shadow-sm ${errors.checkOutTime ? 'border-red-500' : ''}`}
              />
              {errors.checkOutTime && <p className="text-red-500 text-xs mt-1">{errors.checkOutTime}</p>}
            </div>
          </div>
        </div>

        <div className="mb-5">
          <span className='text-xl font-semibold'>Set you price</span>
          <p className='mb-2'>You can change it anytime</p>
          <div className="mt-2">
            <input
              type="number"
              name="price_per_night"
              value={formData.price_per_night}
              onChange={handleChange}
              className={`w-full border p-2 rounded shadow-slate-400 shadow-sm ${errors.price_per_night ? 'border-red-500' : ''}`}
              placeholder="Price per night"
            />
            {errors.price_per_night && <p className="text-red-500 text-xs mt-1">{errors.price_per_night}</p>}
          </div>
        </div>

        <div className="mb-5">
          <p className="text-sm text-gray-600">10% Platform fee : ₹ {platformFee}</p>
          <p className="text-sm text-gray-600">You earn : ₹ {earnings}</p>
        </div>

        <button
          type="submit"
          className={`w-full text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 mb-12 ${infoIncomplete
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-red-500 hover:bg-red-600 focus:ring-red-500 cursor-pointer'
            }`}
          disabled={infoIncomplete}
        >
          Save
        </button>


      </form>
    </div>
  );
}
export default AddHotel
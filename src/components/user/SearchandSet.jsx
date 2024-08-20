import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchandSet = () => {
    const [destination, setDestination] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState('');
    const [errors, setErrors] = useState({
        destination: false,
        checkIn: false,
        checkOut: false,
        guests: false
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (destination && checkIn && checkOut && guests) {
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const today = new Date();
            if (checkInDate < today && checkInDate.toDateString()!== today.toDateString()) {
                setErrors((prevErrors) => ({...prevErrors, checkIn: true }));
            } else if (checkOutDate < checkInDate) {
                setErrors((prevErrors) => ({...prevErrors, checkOut: true }));
            } else {
                const searchParams = new URLSearchParams({
                    destination,
                    checkIn,
                    checkOut,
                    guests
                }).toString();                
                navigate(`/explore?${searchParams}`);
            }
        } else {
            setErrors({
                destination:!destination,
                checkIn:!checkIn,
                checkOut:!checkOut,
                guests:!guests
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'destination') {
            setDestination(value);
            setErrors((prevErrors) => ({...prevErrors, destination:!value }));
        } else if (name === 'checkIn') {
            setCheckIn(value);
            setErrors((prevErrors) => ({...prevErrors, checkIn: false }));
        } else if (name === 'checkOut') {
            setCheckOut(value);
            setErrors((prevErrors) => ({...prevErrors, checkOut: false }));
        } else if (name === 'guests') {
            setGuests(value);
            setErrors((prevErrors) => ({...prevErrors, guests:!value }));
        }
    }; 

    return (
        <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-full shadow-md p-1 w-full max-w-4xl mx-auto mt-5 font-poppins border border-gray-300">
            <div className="flex-1 p-2 mx-2">
                <label className={`block text-xs font-bold ${errors.destination ? 'text-red-500' : 'text-gray-500'}`}>Where</label>
                <input
                    type="text"
                    name="destination"
                    placeholder="Search destinations"
                    value={destination}
                    onChange={handleInputChange}
                    className="bg-transparent outline-none w-full text-gray-700 text-sm"
                />
            </div>
            <div className="flex-1 p-2 border-l border-gray-300">
            <label className={`block text-xs font-bold ${errors.checkIn ? 'text-red-500' : 'text-gray-500'}`}>Check-in</label>
                <input
                    type="date"
                    name="checkIn"
                    value={checkIn}
                    onChange={handleInputChange}
                    className="bg-transparent outline-none w-full text-gray-700 text-sm"
                />
            </div>
            <div className="flex-1 p-2 border-l border-gray-300">
            <label className={`block text-xs font-bold ${errors.checkOut ? 'text-red-500' : 'text-gray-500'}`}>Check-out</label>
                <input
                    type="date"
                    name="checkOut"
                    value={checkOut}
                    onChange={handleInputChange}
                    className="bg-transparent outline-none w-full text-gray-700 text-sm"
                />
            </div>
            <div className="flex-1 p-2 border-l border-gray-300">
            <label className={`block text-xs font-bold ${errors.guests ? 'text-red-500' : 'text-gray-500'}`}>Guests</label>
                <input
                    type="number"
                    name="guests"
                    placeholder="Add guests"
                    value={guests}
                    onChange={handleInputChange}
                    className="bg-transparent outline-none w-full text-gray-700 text-sm"
                />
            </div>
            <button type="submit" className="mx-2">
                <svg width="45" height="45" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="60" height="60" rx="30" fill="#FF385C" />
                    <path d="M40.725 40.725L36.6 36.6" stroke="white" strokeWidth="1.98" strokeMiterlimit="10" strokeLinecap="square" />
                    <path d="M21.75 27.525C21.75 25.9934 22.3584 24.5245 23.4415 23.4415C24.5245 22.3584 25.9934 21.75 27.525 21.75" stroke="white" strokeWidth="1.98" strokeMiterlimit="10" />
                    <path d="M27.525 36.6C32.537 36.6 36.6 32.537 36.6 27.525C36.6 22.513 32.537 18.45 27.525 18.45C22.513 18.45 18.45 22.513 18.45 27.525C18.45 32.537 22.513 36.6 27.525 36.6Z" stroke="white" strokeWidth="1.98" strokeMiterlimit="10" strokeLinecap="square" />
                </svg>
            </button>
        </form>
    )
}

export default SearchandSet
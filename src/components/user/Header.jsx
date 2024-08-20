import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getawayLogo from '../../assets/GetAway_logo.png';
import API from '../../services/axios';
import userRoutes from '../../services/endpoints/userEndpoints';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slice/userAuthSlice';
import { message } from 'antd';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null)
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userData = useSelector((state) => state.userAuth.userData)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await API.post(userRoutes.logout);
      if (response.status === 200) {
        setUser(null);
        dispatch(logout())
        window.location.href = '/'; 
      }
    } catch (err) {
      console.error('Error logging out', err);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get(userRoutes.getUser)
        if (response.data.user.is_blocked) {
          dispatch(logout());
          message.error('This account is blocked')
          setUser(null);
          navigate('/login');
        } else if (response.data && response.data.user) {
          setUser(response.data.user.fullName);
        }
      } catch (err) {
        console.error('Error fetching user data', err);
        setUser(null);
      }
    }
    fetchUser()
  }, [])

  return (
    <>
      <header className="bg-white shadow-md font-poppins">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          <div>
            <a href="/">
              <img
                className="mx-14 object-cover h-14"
                src={getawayLogo}
                alt="GetAway Logo"
              />
            </a>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-36">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link to="/explore" className="text-gray-600 hover:text-gray-900">Explore</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4 relative">
            {user && (
              <span className="text-gray-600 pr-10">{userData.fullName }</span>
            )}
            {/* <button className="text-gray-600 hover:text-gray-900 pr-10">
              <svg width="39" height="32" viewBox="0 0 39 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5699 22.72L27.2008 27.2M15.2008 9.60005C17.8517 9.60005 20.0008 11.7491 20.0008 14.4M25.7074 15.2534C25.7074 21.0266 21.0273 25.7067 15.2541 25.7067C9.4809 25.7067 4.80078 21.0266 4.80078 15.2534C4.80078 9.48016 9.4809 4.80005 15.2541 4.80005C21.0273 4.80005 25.7074 9.48016 25.7074 15.2534Z" stroke="black" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button> */}
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="text-gray-600 hover:text-gray-900 pr-10">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.19922 25.5999C7.81411 24.9113 10.6939 21.7422 11.5379 21.7422H20.4611C21.684 21.7422 24.1805 24.3691 24.7992 25.2951M28.7992 15.9999C28.7992 23.0692 23.0685 28.7999 15.9992 28.7999C8.92997 28.7999 3.19922 23.0692 3.19922 15.9999C3.19922 8.93071 8.92997 3.19995 15.9992 3.19995C23.0685 3.19995 28.7992 8.93071 28.7992 15.9999ZM20.5843 11.6372C20.5843 9.19521 18.5228 7.19995 15.9996 7.19995C13.4764 7.19995 11.4149 9.19521 11.4149 11.6372C11.4149 14.0792 13.4764 16.0745 15.9996 16.0745C18.5228 16.0745 20.5843 14.0792 20.5843 11.6372Z" stroke="black" strokeWidth="2" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  {user ? (
                    <>
                      <Link to="/profile/account" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                      <Link to="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleLogout}>Logout</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sign in</Link>
                      <Link to="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sign up</Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;




// ProfileSidebar.jsx
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const ProfileSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen mt-14">
      <div className="w-64 bg-card text-card-foreground p-4">
        <ul className="space-y-6">
          <li className={`flex items-center space-x-2 ${isActive('/profile/account') ? 'bg-gray-200' : ''}`}>
            <div className={`w-1 h-6 ${isActive('/profile/account') ? 'bg-red-500' : 'bg-transparent'}`}></div>
            <Link className='flex items-center space-x-2 text-sm' to='account'>My Account</Link>
          </li>
          <li className={`flex items-center space-x-2 ${isActive('/profile/bookings') ? 'bg-gray-200' : ''}`}>
            <div className={`w-1 h-6 ${isActive('/profile/bookings') ? 'bg-red-500' : 'bg-transparent'}`}></div>
            <Link className='flex items-center space-x-2 text-sm' to='bookings'>My Bookings</Link>
          </li>
          <li className={`flex items-center space-x-2 ${isActive('/profile/accommodations') ? 'bg-gray-200' : ''}`}>
            <div className={`w-1 h-6 ${isActive('/profile/accommodations') ? 'bg-red-500' : 'bg-transparent'}`}></div>
            <Link className='flex items-center space-x-2 text-sm' to='accommodations'>My Accommodations</Link>
          </li>
          {/* <li className={`flex items-center space-x-2 ${isActive('/profile/revenue') ? 'bg-gray-200' : ''}`}>
            <div className={`w-1 h-6 ${isActive('/profile/revenue') ? 'bg-red-500' : 'bg-transparent'}`}></div>
            <Link className='flex items-center space-x-2 text-sm' to='revenue'>My Revenue</Link>
          </li> */}
        </ul>
      </div>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileSidebar;

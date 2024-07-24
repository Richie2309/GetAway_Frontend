import React from 'react';
import { Link } from 'react-router-dom';

const ProfileSidebar = () => {
  return (
    <div className="w-64 md:w-40 h-screen bg-card text-card-foreground p-4 md:p-2 ml-20 md:ml-2">
      <ul className="space-y-12 ml-10">
        <li className="flex items-center space-x-2">
          <div className="w-1 h-6 bg-red-500"></div>
          <Link className='flex items-center space-x-2 text-sm md:text-xs' to='account'>My Account</Link>
        </li>
        <li className="flex items-center space-x-2">
          <Link className='flex items-center space-x-2 text-sm md:text-xs' to='bookings'>My Bookings</Link>
        </li>
        <li className="flex items-center space-x-2">
          <Link className='flex items-center space-x-2 text-sm md:text-xs' to='accommodations'>My Accommodations</Link>
        </li>
        <li className="flex items-center space-x-2">
          <Link className='flex items-center space-x-2 text-sm md:text-xs' to='revenue'>My Revenue</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;

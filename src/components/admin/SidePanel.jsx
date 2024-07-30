// src/components/admin/SidePanel.jsx
import React from 'react';
import { FaChartPie } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa6";
import { BiSolidLogOut } from "react-icons/bi";
import { Link, Outlet, useLocation } from 'react-router-dom';

import getawayLogo from '../../assets/GetAway_logo.png';

const SidePanel = () => {
  const location = useLocation();
  const noSidebarRoutes = ['/admin/login'];

  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {

  }

  return (
    <div className="flex h-screen">
      {showSidebar && (
        <div className="bg-card text-card-foreground h-full w-64 p-4 font-poppins">
          <div className="flex flex-col items-center">
            <img
              className="mx-14 object-cover h-14 m-9"
              src={getawayLogo}
              alt="GetAway Logo"
            />
            <nav className="w-full">
              <ul className="space-y-4">
                <Link to='dashboard'>
                  <li className={` mb-3 flex items-center p-2 bg-secondary text-secondary-foreground rounded-lg ${isActive('/admin/dashboard') ? 'bg-gray-200' : ''}`}>
                    <FaChartPie className="w-6 h-6 mr-3" />
                    Dashboard
                  </li>
                </Link>
                <Link to='user-management'>
                  <li className={`mb-3 flex items-center p-2 bg-secondary text-secondary-foreground rounded-lg ${isActive('/admin/user-management') ? 'bg-gray-200' : ''}`}>
                    <FaCircleUser className="w-6 h-6 mr-3" />
                    Users
                  </li>
                </Link>
                <Link to='hotel-management'>
                  <li className={`mb-3 flex items-center p-2 bg-secondary text-secondary-foreground rounded-lg ${isActive('/admin/hotel-management') ? 'bg-gray-200' : ''}`}>
                    <FaHotel className="w-6 h-6 mr-3" />
                    Accommodations
                  </li>
                </Link>
                <li className="mb-3 flex items-center p-2 text-muted-foreground hover:bg-muted hover:text-muted-foreground rounded-lg">
                  <BiSolidLogOut className="w-6 h-6 mr-3" />
                  <Link to="/admin/login" className="mr-3" onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default SidePanel;

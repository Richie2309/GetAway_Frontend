import React from 'react'
import { FaChartPie } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa6";
import { BiSolidLogOut } from "react-icons/bi";

import getawayLogo from '../../assets/GetAway_logo.png'

const SidePanel = () => {
  return (
    <div className="bg-card text-card-foreground h-full w-64 p-4 font-poppins">
      <div className="flex flex-col items-center">
        <img
          className="mx-14 object-cover h-14 m-9"
          src={getawayLogo}
          alt="GetAway Logo"
        />
        <nav className="w-full">
          <ul className="space-y-4">
            <li className="flex items-center p-2 bg-secondary text-secondary-foreground rounded-lg">
              <FaChartPie className="w-6 h-6" />
              <span className='m-3'> Dashboard</span>
            </li>
            <li className="flex items-center p-2 text-muted-foreground hover:bg-muted hover:text-muted-foreground rounded-lg">
              <FaCircleUser className="w-6 h-6" />
              <span className='m-3'>Users</span>
            </li>
            <li className="flex items-center p-2 text-muted-foreground hover:bg-muted hover:text-muted-foreground rounded-lg">
              <FaHotel className="w-6 h-6" />
              <span className='m-3'>Accommodations</span>
            </li>
            <li className="flex items-center p-2 text-muted-foreground hover:bg-muted hover:text-muted-foreground rounded-lg">
              <BiSolidLogOut className="w-6 h-6" />
              <span className='m-3'>Logout</span>
            </li>
          </ul>
        </nav>

      </div>
    </div>
  )
}

export default SidePanel
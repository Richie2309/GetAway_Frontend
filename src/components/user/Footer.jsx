import React from 'react';
import { FaSquareInstagram, FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300 py-4 flex justify-between items-center px-8">
      {/* Left Side */}
      <div className="text-black font-semibold text-lg font-belleza">
       GetAway
      </div>

      {/* Center Social Icons */}
      <div className="flex space-x-6">
        <a href="#" aria-label="Instagram" className="text-gray-700 hover:text-black">
          <FaSquareInstagram size={24} />
        </a>
        <a href="#" aria-label="Facebook" className="text-gray-700 hover:text-black">
          <FaSquareFacebook size={24} />
        </a>
        <a href="#" aria-label="Restaurant" className="text-gray-700 hover:text-black">
          <FaSquareXTwitter size={24} />
        </a>
      </div>

      {/* Right Side */}
      <div className="text-gray-600 text-sm">
        Copyright © 2024 GetAway Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

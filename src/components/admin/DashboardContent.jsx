// src/pages/admin/DashboardContent.jsx
import React, { useEffect, useState } from 'react';
import SalesGraph from './SalesGraph';
import { getDashboardStats } from '../../api/admin';

const DashboardContent = () => {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAccommodations: 0,
    totalProfit: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {      
      const data = await getDashboardStats();
      setStats(data);
    };
    fetchStats();
  }, []);


  return (
    <div className="w-full flex-1 min-h-screen bg-zinc-100 p-4 font-poppins">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-black">Admin</h1>
      </header>
      <div className="mt-4">
        <nav className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-t-lg">
          <ul className="flex space-x-4">
            <li className="font-semibold">Dashboard</li>
          </ul>
        </nav>
        <div className="bg-white shadow-md rounded-b-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-lg font-semibold text-black">Users</h2>
              <p className="text-2xl text-black">{stats.totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-lg font-semibold text-black">Accommodations</h2>
              <p className="text-2xl text-black">{stats.totalAccommodations}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-lg font-semibold text-black">Profit</h2>
              <p className="text-2xl text-black">₹{stats.totalProfit}</p>
            </div>
          </div>
          <SalesGraph />
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;

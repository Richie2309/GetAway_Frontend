import React from 'react';

const DashboardContent = () => {
  return (
    <div className="flex-1 min-h-screen bg-zinc-100 p-4 font-poppins">
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
        <p className="text-2xl text-black">120</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-semibold text-black">Accommodations</h2>
        <p className="text-2xl text-black">40</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-semibold text-black">Profit</h2>
        <p className="text-2xl text-black">₹10000</p>
      </div>
    </div>
    <div>
      <h2 className="text-lg font-semibold mb-4 text-black">Sales Graph</h2>
      <div className="bg-gray-200 h-64 rounded-lg"></div>
    </div>
  </div>
</div>

    </div>
  );
}

export default DashboardContent;

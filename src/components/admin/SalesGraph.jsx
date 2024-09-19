import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDailySales } from '../../api/admin';

// Initialize data for the entire year
const initializeData = (type) => {
  const data = [];
  const now = new Date();

  if (type === 'daily') {
    // Initialize data for all dates of the current month
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      data.push({ name: `${i}`, totalSales: 0 });
    }
  } else if (type === 'monthly') {
    // Initialize data for the months of the year
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    months.forEach(month => data.push({ name: month, totalSales: 0 }));
  }
  
  return data;
};

const SalesGraph = () => {
  const [timeFrame, setTimeFrame] = useState('daily');
  const [month, setMonth] = useState(new Date().getMonth()); // Initialize with current month
  const [data, setData] = useState(initializeData('daily'));
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDailySales();
        setSalesData(result); // Store the entire year's sales data
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };
    fetchData();
  }, []);

  // Filter data based on selected month
  useEffect(() => {
    const filteredData = initializeData(timeFrame);
    salesData.forEach(item => {
      const itemDate = new Date(item.date);
      if (timeFrame === 'daily' && itemDate.getMonth() === month && itemDate.getFullYear() === new Date().getFullYear()) {
        const dayOfMonth = itemDate.getDate();
        const index = filteredData.findIndex(dataPoint => parseInt(dataPoint.name) === dayOfMonth);
        if (index !== -1) {
          filteredData[index].totalSales = item.totalSales;
        }
      }
    });
    setData(filteredData);
  }, [salesData, month, timeFrame]);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-black">Sales Graph</h2>
        <div className="space-x-2">
          {['daily', 'monthly'].map((option) => (
            <button
              key={option}
              onClick={() => setTimeFrame(option)}
              className={`px-3 py-1 rounded ${
                timeFrame === option
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {timeFrame === 'daily' && (
        <div className="mb-4">
          <label htmlFor="month-select" className="mr-2">Select Month:</label>
          <select
            id="month-select"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="bg-gray-200 p-2 rounded"
          >
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, index) => (
              <option key={index} value={index}>
                {m}
              </option>
            ))}
          </select>
        </div>
      )}

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <div style={{ width: timeFrame === 'daily' ? '1200px' : '100%', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} padding={{ left: 10, right: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalSales" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalesGraph;

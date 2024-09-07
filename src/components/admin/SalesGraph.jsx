import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDailySales, getMonthlySales } from '../../api/admin';

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
  const [data, setData] = useState(initializeData('daily'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = [];
        if (timeFrame === 'daily') {
          result = await getDailySales();
        } else if (timeFrame === 'monthly') {
          result = await getMonthlySales();
        }

        // Merge the result with the initialized data
        const initializedData = initializeData(timeFrame);
        result.forEach(item => {
          if (timeFrame === 'daily') {
            const itemDate = new Date(item.date);
            if (itemDate.getMonth() === new Date().getMonth() && 
                itemDate.getFullYear() === new Date().getFullYear()) {
              const dayOfMonth = itemDate.getDate();
              const index = initializedData.findIndex(dataPoint => parseInt(dataPoint.name) === dayOfMonth);
              if (index !== -1) {
                initializedData[index].totalSales = item.totalSales;
              }
            }
          } else if (timeFrame === 'monthly') {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const monthIndex = new Date(item.month).getMonth();
            const index = initializedData.findIndex(dataPoint => dataPoint.name === monthNames[monthIndex]);
            if (index !== -1) {
              initializedData[index].totalSales = item.totalSales;
            }
          }
        });
        setData(initializedData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };
    fetchData();
  }, [timeFrame]);

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
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <div style={{ width: timeFrame === 'daily' ? '1200px' : '100%', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} padding={{ left: 10, right: 10 }}/>
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
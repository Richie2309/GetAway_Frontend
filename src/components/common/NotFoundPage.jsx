import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-400 text-white">
      <h1 className="text-center text-8xl font-bold text-white drop-shadow-[10px_10px_0px_rgba(0,0,0,0.7)]">
        404
      </h1>

      <p className="text-2xl text-center font-light mt-4">
        You traveled a bit too far, my friend. I wish you well in your journey and remember,
      </p>
      <p className="text-base text-center font-light mt-2">
        “If one dream should fall and break into a thousand pieces, never be afraid to pick one of those pieces up and begin again.” <br />- <i>Flavia Weedn</i>
      </p>
      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}  
          className="px-6 py-3 border border-white rounded bg-white text-red-600 transition duration-300 ease-in-out hover:bg-opacity-0 hover:text-white"
        >
          Take Me Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;

import React from 'react'
import success from '../../assets/Success.png';
import { useNavigate } from 'react-router-dom';

const BooingSuccess = () => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate('/');
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground font-poppins">
      <h1 className="text-3xl font-bold mb-4">All Done</h1>
      <div className="flex items-center justify-center w-24 h-24 rounded-full border-4 border-primary bg-white dark:bg-background">
        <img aria-hidden="true" alt="checkmark" src={success} className="w-12 h-12" />
      </div>
      <h2 className="text-xl font-semibold mt-4">Payment Received Successfully</h2>
      <p className="text-muted-foreground mt-2">Congratulations🎉</p>
      <p className="text-muted-foreground">Your booking has been confirmed!</p>
      <button className="mt-6 bg-red-400 text-white py-2 rounded-lg " onClick={handleBackToHome}>
        Back to home
      </button>
    </div>
  )
}

export default BooingSuccess
import React, { useEffect, useRef, useState } from 'react'
import signinform from '../../assets/SignPage.png'
import { useNavigate } from 'react-router-dom'
import API from '../../services/axios'
import userRoutes from '../../services/endpoints/userEndpoints';

const SignupOtp = (props) => {
  const navigate = useNavigate()
  const [timer, setTimer] = useState(120); // 120 seconds = 2 minutes
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [isResendRequested, setIsResendRequested] = useState(false);
  const otpInputRef = useRef(null)


  const handleResendCode = () => {
    setIsResendRequested(true);
    API.post(userRoutes.resendSignupOtp, { email})
    setTimer(120);
    setIsTimerExpired(false);
    // Clear OTP input field
    otpInputRef.current.value = '';
  };

  const handleConfirm = () => {
    const otpValue = otpInputRef.current.value;
    API.post(userRoutes.verifySignupOtp, { email, otp: otpValue })
      .then(respose => {
        console.log(respose);
        navigate('/')
      })
      .catch(error => {
        console.log(error); 
      });
  };


  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(countdown);
          setIsTimerExpired(true);
          setIsResendRequested(false);
          return 0;
        }
      });
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 font-poppins">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex w-3/4 max-w-4xl">
        <div className="w-1/2">
          <img
            src={signinform}
            alt="Beautiful beach view"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Check your email</h2>
          <p>You should have an email from us
            with a code for creating a GetAway account.</p><br />
          {/* <form className="space-y-4" onSubmit={handleFormSubmit}> */}
          <div>
            <label className="block text-sm font-medium text-zinc-700">
              Enter the code
            </label>
            <input
              type="text"
              id="otp"
              ref={otpInputRef}
              className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              onChange={handleOtpInputChange}
              required />
          </div>

          <div>
            <button
              onClick={handleConfirm}
              className="flex w-full items-center justify-center rounded-[20px] bg-red-600/50 px-12 py-[8.9px] mt-3"
              disabled={isTimerExpired}
            >
              Confirm
            </button>
          </div>
          {/* </form> */}
          <div>
            <p className="mt-4 text-center text-sm text-zinc-600 flex justify-end">
              Did not arrive?
              <button
                onClick={handleResendCode}
                className={`flex items-center justify-center mx-1 text-blue-500 hover:underline ${!isTimerExpired ? "text-gray-400" : "text-blue-500"}`}
                disabled={!isTimerExpired}
              >
                Resend Code
              </button>
            </p>
          </div>
          <div className="text-center mt-4 text-sm text-zinc-600">
            {!isTimerExpired ? (
              <p>Time remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
            ) : (
              <p>OTP expired. Please request a new one.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupOtp
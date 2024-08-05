import React, { useEffect, useRef, useState } from 'react';
import signinform from '../../assets/SignPage.png';
import {  useNavigate } from 'react-router-dom';
import { otpResend, verifyForgotPasswordOtp } from '../../api/user';

const OTP = ({ email }) => {
    const navigate = useNavigate()
   

    const [timer, setTimer] = useState(120);
    const [isTimerExpired, setIsTimerExpired] = useState(false);
    const [isResendRequested, setIsResendRequested] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const otpInputRef = useRef(null);

    const handleResendCode = () => {
        if (!isResendRequested) {
            setIsResendRequested(true);
            setTimer(120);
            setIsTimerExpired(false);

            otpResend(email)
                .then(response => {
                    if (otpInputRef.current) {
                        otpInputRef.current.value = '';
                    }
                })
                .catch(error => {
                    console.error('Error resending OTP:', error);
                    setError('Error resending OTP. Please try again.');
                })
                .finally(() => setIsResendRequested(false));
        }
    }

    const handleConfirm = (e) => {
        console.log(email);
        e.preventDefault();
        const otpValue = otpInputRef.current?.value;
        if (!otpValue) {
            setError('Please enter the OTP.');
            return;
        }
        setLoading(true);
        verifyForgotPasswordOtp(email, otpValue)
            .then(response => {
                console.log('OTP verified successfully. Navigating to reset password.');

                navigate('/reset-password', { state: { email, otp: otpValue } });
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError('Error verifying OTP. Please try again.');
                }
            })
            .finally(() => setLoading(false));
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

        return () => clearInterval(countdown);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-100 font-poppins p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full md:w-3/4 max-w-4xl">
                <div className="w-full md:w-1/2 h-48 md:h-auto">
                    <img
                        src={signinform}
                        alt="Beautiful beach view"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">Check your email</h2>
                    <p className="text-sm md:text-base mb-4">
                        If you have a GetAway account with the email address
                        you just entered, you should have an email from us
                        with a code for resetting your password.
                    </p>
                    <form className="space-y-4" onSubmit={handleConfirm}>
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-zinc-700">
                                Enter the code
                            </label>
                            <input
                                type="text"
                                id="otp"
                                ref={otpInputRef}
                                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Enter code"
                            />
                        </div>
                        {error && (
                            <div className="text-red-600 mt-2 text-sm">
                                {error}
                            </div>
                        )}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full items-center justify-center rounded-[20px] bg-red-600/50 px-4 py-2 md:px-12 md:py-[8.9px]"
                                disabled={loading || isTimerExpired}
                            >
                                {loading ? 'Confirming...' : 'Confirm'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm md:text-base text-zinc-600 flex flex-col md:flex-row md:justify-end items-center">
                        <span>Did not arrive?</span>
                        <button
                            onClick={handleResendCode}
                            className={`ml-2 text-blue-500 hover:underline ${!isTimerExpired ? 'text-gray-400' : 'text-blue-500'}`}
                            disabled={isResendRequested || isTimerExpired}
                        >
                            {isResendRequested ? 'Resending...' : 'Resend Code'}
                        </button>
                    </div>
                    <div className="text-center mt-4 text-sm md:text-base text-zinc-600">
                        {!isTimerExpired ? (
                            <p>Time remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
                        ) : (
                            <p>OTP expired. Please request a new one.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTP;

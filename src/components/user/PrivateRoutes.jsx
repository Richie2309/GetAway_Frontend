import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import SignupOtp from '../../pages/user/SignupOtp'

const PrivateRoute = () => {
    const isVerified = useSelector((state) => state.otpVerification.otpVerified)
    console.log('isVerified',isVerified);
    return isVerified ? <SignupOtp /> : <Navigate to='/login' replace />;
}


export default PrivateRoute


import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/user/Home'
import Signin from '../pages/user/Signin'
import Signup from '../pages/user/Signup'
import SignupOtp from '../pages/user/SignupOtp'
import ForgotPassword from '../pages/user/ForgotPassword'
import OTP from '../pages/user/OTP'

const UserRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signup_otp' element={<SignupOtp />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
      <Route path='/otp' element={<OTP />} />
    </Routes>
  )
}

export default UserRoutes
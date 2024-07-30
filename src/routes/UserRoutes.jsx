import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/user/Home';
import Signin from '../pages/user/Signin';
import Signup from '../pages/user/Signup';
import ForgotPassword from '../pages/user/ForgotPassword';
import OTP from '../pages/user/OTP';
import Explore from '../pages/user/Explore';
import PrivateRoutes from '../components/user/PrivateRoutes';
import Header from '../components/user/Header';
import Layout from '../components/user/Layout';
import { useSelector } from 'react-redux';
import SignupOtp from '../pages/user/SignupOtp';

const UserRoutes = () => {
  const isLoggedIn = useSelector((state) => state.userAuth.isAuthenticated);

  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Signin />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/forgotpass_otp' element={<OTP />} />
        </>
      ) : (
        <>
          <Route path='/login' element={<Navigate to="/" />} />
          <Route path='/signup' element={<Navigate to="/" />} />
        </>
      )}
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/profile/*' element={<PrivateRoutes />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
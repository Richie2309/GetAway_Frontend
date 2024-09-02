import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/user/Home';
import Signin from '../pages/user/Signin';
import Signup from '../pages/user/Signup';
import ForgotPassword from '../pages/user/ForgotPassword';
import Explore from '../pages/user/Explore';
import PrivateRoutes from '../components/user/PrivateRoutes';
import Layout from '../components/user/Layout';
import { useDispatch, useSelector } from 'react-redux';
import ResetPassword from '../pages/user/ResetPassword';
import userRoutes from '../services/endpoints/userEndpoints';
import API from '../services/axios';
import { userData } from '../redux/slice/userAuthSlice';
import SingleRoom from '../pages/user/SingleRoom';

const UserRoutes = () => {
  const isLoggedIn = useSelector((state) => state.userAuth.isAuthenticated);
  const dispatch = useDispatch()
  const [loading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleFn = async () => {
      try {
        const response = await API.get(userRoutes.getUser)
        dispatch(userData(response.data.user))
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false)
      }
    }
    handleFn()
  }, [])


  if (loading) {
    return <div>loadding</div>
  }

  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Signin />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
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
        <Route path='/hotel/:id' element={<SingleRoom />} />
        <Route path='/profile/*' element={<PrivateRoutes />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import Account from '../../pages/user/Account';
import AddHotel from '../../pages/user/AddHotel';
import MyAccommodations from '../../pages/user/MyAccommodations';
import MyBookings from '../../pages/user/Mybookings';
import ProfileSidebar from './ProfileSidebar';

const PrivateRoute = ({ condition, redirectTo, children }) => {
  return condition ? children : <Navigate to={redirectTo} replace />;
};

const PrivateRoutes = () => {
  const isLoggedIn = useSelector((state) => state.userAuth.isAuthenticated);

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <PrivateRoute condition={isLoggedIn} redirectTo="/login">
            <ProfileSidebar />
          </PrivateRoute>
        }
      >
        <Route path="account" element={<Account />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="accommodations" element={<MyAccommodations />} />
        <Route path="accommodations/add-hotel/:hotelId?" element={<AddHotel />} />
        <Route path="revenue" element={<Account />} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes; 
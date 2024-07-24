import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import SignupOtp from '../../pages/user/SignupOtp';
import Account from '../../pages/user/Account';

const PrivateRoute = ({ condition, redirectTo, children }) => {
    console.log("redirectTo : ", redirectTo);
    return condition ? children : <Navigate to={redirectTo} replace />;
};

const PrivateRoutes = () => {
    const isVerified = useSelector((state) => state.otpVerification.otpVerified);
    const isLoggedIn = useSelector((state) => state.userAuth.isAuthenticated);
    console.log("isVerified : ", isVerified);
    console.log("isLoggedin in pvtrt: ", isLoggedIn);

    return (
        <Routes>
            <Route
                path="/otp"
                element={
                    <PrivateRoute condition={isVerified} redirectTo="/login">
                        <SignupOtp />
                    </PrivateRoute>
                }
            />
            <Route
                path="/*"
                element={
                    <PrivateRoute condition={isLoggedIn} redirectTo="/login">
                        <Routes>
                            <Route path="account" element={<Account />} />
                            <Route path="bookings" element={<Account />} />
                            <Route path="accommodations" element={<Account />} />
                            <Route path="revenue" element={<Account />} />
                        </Routes>
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};

export default PrivateRoutes;
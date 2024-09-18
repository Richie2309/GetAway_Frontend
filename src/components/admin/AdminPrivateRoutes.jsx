import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

export const AdminPrivateRoutes = () => {
    const isAuthenticated = useSelector((state) =>state.adminAuth.isAuthenticated);

    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};
 
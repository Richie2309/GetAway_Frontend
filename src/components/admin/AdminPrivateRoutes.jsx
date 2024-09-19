import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import API from '../../services/axios';
import adminRoutes from '../../services/endpoints/adminEndpoints';

export const AdminPrivateRoutes = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await API.get(adminRoutes.checkAuth);
                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    navigate('/admin/login');
                }
            } catch (error) {
                navigate('/admin/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, [navigate]);

    if (loading) return <div>Loading...</div>;

    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};
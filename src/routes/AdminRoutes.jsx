import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/admin/AdminLogin'
import Dashboard from '../pages/admin/Dashboard'
import SidePanel from '../components/admin/SidePanel'
import HotelManagement from '../pages/admin/HotelManagement'
import UserManagement from '../pages/admin/UserManagement'
import PendingHotel from '../pages/admin/PendingHotel'
import VerifyHotel from '../pages/admin/VerifyHotel'
import { AdminPrivateRoutes } from '../components/admin/AdminPrivateRoutes'
import NotFoundPage from '../components/common/NotFoundPage'

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminPrivateRoutes />}>
                <Route element={<SidePanel/>}>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="user-management" element={<UserManagement />} />
                    <Route path="hotel-management" element={<HotelManagement />} />
                    <Route path="hotel-management/pending" element={<PendingHotel />} />
                    <Route path="hotel-management/:hotelId" element={<VerifyHotel />} />
                </Route>
            </Route>
            <Route path="/admin/*" element={<NotFoundPage />} />
        </Routes>
    )
}
 
export default AdminRoutes
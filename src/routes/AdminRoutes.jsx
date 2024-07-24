import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/admin/AdminLogin'
import Dashboard from '../pages/admin/Dashboard'

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='/admin/login' element={<AdminLogin />} />
            {/* <Route path="/admin" element={<PrivateRoute />}> */}
                <Route path='/admin/dashboard' element={<Dashboard />} />
            {/* </Route> */}

        </Routes>
    )
}

export default AdminRoutes
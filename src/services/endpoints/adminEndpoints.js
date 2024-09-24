const adminRoutes = {
    login: '/api/admin/login',
    logout: '/api/admin/logout',
    checkAuth:'/api/admin/checkAuth',
    getUser: '/api/admin/getUser',
    toggleBlockUser: '/api/admin/toggleBlockUser',
    getHotels: 'api/admin/getHotels',
    getHotelById: '/api/admin/getHotelById',
    getHotelDetailsById:'/api/admin/getHotelDetailsById',
    approveHotel: '/api/admin/approve-hotel',
    rejectHotel: '/api/admin/reject-hotel',
    getDailySales: '/api/admin/sales/daily',
    // getWeeklySales: '/api/admin/sales/weekly',
    getMonthlySales: '/api/admin/sales/monthly',
    dashboard: '/api/admin/dashboard-stats'
}

export default adminRoutes
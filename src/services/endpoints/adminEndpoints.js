const adminRoutes = {
    login: '/api/admin/login',
    // checkAuth:'/api/checkAuth',
    getUser: '/api/admin/getUser',
    toggleBlockUser: '/api/admin/toggleBlockUser',
    getHotels: 'api/admin/getHotels',
    getHotelById: '/api/admin/getHotelById',
    approveHotel: '/api/admin/approve-hotel',
    rejectHotel: '/api/admin/reject-hotel',
    getDailySales: '/api/admin/sales/daily',
    // getWeeklySales: '/api/admin/sales/weekly',
    getMonthlySales: '/api/admin/sales/monthly',
    dashboard:'/api/admin/dashboard-stats'
}

export default adminRoutes
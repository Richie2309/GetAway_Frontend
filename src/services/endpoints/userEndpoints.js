import { getSchedule } from "../../api/user"

const userRoutes = {
    register: '/api/register',
    otpVerify: '/api/otpVerify',
    otpResend: '/api/otpResend',
    login: '/api/login',
    getUser: '/api/getUser',
    logout: '/api/logout',
    googAuth: '/api/googleAuth',
    checkMail: '/api/checkMail',
    verifyForgotPasswordOtp: '/api/verifyForgotPasswordOtp',
    resetPassword: '/api/resetPassword',
    updateProfile: '/api/updateProfile',
    updatePassword: '/api/updatePassword',
    updateIdentity: '/api/updateIdentity',
    updateBankAccount: '/api/updateBankAccount',
    addHotel: '/api/addHotel',
    getMyHotels: '/api/getMyHotels',
    getHotelData: '/api/getHotel',
    updateHotel: '/api/updateHotel',
    getAllHotels: '/api/getAllHotels',
    checkAvailability: '/api/checkAvailability',
    createPaymentIntent: '/api/createPaymentIntent',
    createBooking: '/api/createBooking',
    getBookedHotels: '/api/getBookedHotels',
    getSchedule: '/api/getSchedule',
    getToken:'/api/getToken',
    getMessage: '/api/getMessage',
    sendMessage: '/api/sendMessage',
    getMessagedUsers:'/api/getMessagedUsers',
}

export default userRoutes
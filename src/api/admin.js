import API from "../services/axios"
import adminRoutes from '../services/endpoints/adminEndpoints'

export const getUserData = async () => {
  try {
    const response = await API.get(adminRoutes.getUser)
    return response
  } catch (err) {
    console.log('Error getting user data');
    throw err
  }
}

export const toggleBlockUser = async (userId) => {
  try {
    const response = await API.patch(`${adminRoutes.toggleBlockUser}/${userId}`);
    return response;
  } catch (err) {
    console.log('Error getting user data');
    throw err
  }
}

export const getHotelData = async () => {
  try {
    const response = await API.get(adminRoutes.getHotels)
    return response
  } catch (error) {
    console.log('Error getting hotel data');
    throw err
  }
}
export const getHotelById = async (hotelId) => {
  try {
    const response = await API.get(`${adminRoutes.getHotelById}/${hotelId}`);
    return response;
  } catch (err) {
    console.log('Error getting hotel details');
    throw err;
  }
}

export const approveHotel = async (hotelId) => {
  try {
    const response = await API.post(`${adminRoutes.approveHotel}/${hotelId}`);
    console.log("response approveHotel : ",response.data);
    return response.data;
  } catch (err) {
    console.error('Error approving hotel:', err);
    throw err;
  }
};

export const rejectHotel= async (hotelId, reason) => {
  try {
    const response = await API.patch(adminRoutes.rejectHotel, { hotelId, reason });
    return response.data;
  } catch (err) {
    console.error('Error rejecting hotel:', err);
    throw err;
  }
};
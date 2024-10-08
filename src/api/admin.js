import API from "../services/axios"
import adminRoutes from '../services/endpoints/adminEndpoints'

export const adminLogout = async () => {
  try {
    const response = await API.post(adminRoutes.logout)
    return response
  } catch (err) {
    console.error('Error loggin out');
    throw err
  }
}

export const getUserData = async () => {
  try {
    const response = await API.get(adminRoutes.getUser)
    return response
  } catch (err) {
    console.error('Error getting user data');
    throw err
  }
}

export const toggleBlockUser = async (userId) => {
  try {
    const response = await API.patch(`${adminRoutes.toggleBlockUser}/${userId}`);
    return response;
  } catch (err) {
    console.error('Error getting user data');
    throw err
  }
}

export const getHotelData = async () => {
  try {
    const response = await API.get(adminRoutes.getHotels)
    return response
  } catch (error) {
    console.error('Error getting hotel data');
    throw error;
  }
}
export const getHotelById = async (hotelId) => {
  try {
    const response = await API.get(`${adminRoutes.getHotelById}/${hotelId}`);
    return response;
  } catch (err) {
    console.error('Error getting hotel details');
    throw err;
  }
}

export const getHotelDetailsById=async(hotelId)=>{
  try {
    const response = await API.get(`${adminRoutes.getHotelDetailsById}/${hotelId}`);
    return response;
  } catch (err) {
    console.error('Error getting hotel details');
    throw err;
  }
}

export const approveHotel = async (hotelId) => {
  try {
    const response = await API.post(`${adminRoutes.approveHotel}/${hotelId}`);
    return response.data;
  } catch (err) {
    console.error('Error approving hotel:', err);
    throw err;
  }
};

export const rejectHotel = async (hotelId, reason) => {
  try {    
    const response = await API.patch(`${adminRoutes.rejectHotel}/${hotelId}`, { reason });
    return response.data;
  } catch (err) {
    console.error('Error rejecting hotel:', err);
    throw err;
  } 
};

export const getDailySales = async () => {
  const response = await API.get(adminRoutes.getDailySales);
  return response.data;
};

// export const getWeeklySales = async () => {
//   const response = await API.get(adminRoutes.getWeeklySales);
//   return response.data;
// };

export const getMonthlySales = async () => {
  const response = await API.get(adminRoutes.getMonthlySales);
  return response.data;
};

export const getDashboardStats = async () => {
  try {
    const response = await API.get(adminRoutes.dashboard);
    return response.data;
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    throw err
  }
};
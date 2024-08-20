import API from "../services/axios"
import userRoutes from "../services/endpoints/userEndpoints"

//To register user 
const userRegister = async (fullName, email, password) => {
  try {
    const response = await API.post(userRoutes.register, {
      fullName,
      email,
      password
    })
    return response
  } catch (err) {
    console.log("Error occured during register", err);
    throw err
  }
}

//To verify OTP 
export const otpVerify = async (otp) => {
  try {
    const response = await API.post(userRoutes.otpVerify, {
      otp
    })
    return response
  } catch (err) {
    console.log("Error occured during otp verification", err);
    throw err
  }
}

//To resent the OTP
export const otpResend = async (email) => {
  try {
    const response = await API.post(userRoutes.otpVerify, { email })
    return response
  } catch (err) {
    console.log("Error occured during otp verification", err);
    throw err
  }
}

//For login with google
export const googleLogin = async (name, email) => {
  try {
    const response = await API.post(userRoutes.googAuth, { name, email });
    return response;
  } catch (err) {
    console.log("Error occurred during Google login", err);
    throw err;
  }
};

//To get user info
export const getUserData = async () => {
  try {
    const response = await API.get(userRoutes.getUser)
    return response
  } catch (err) {
    console.log('Error getting user data');
    throw err
  }
}

//To check if email exist
export const checkMail = async (email) => {
  try {
    const response = await API.get(`${userRoutes.checkMail}?email=${email}`)
    return response
  } catch (err) {
    console.log('Error getting details');
    throw err
  }
}

//To verify the OTP
export const verifyForgotPasswordOtp = async (email, otp) => {
  try {
    const response = await API.post(userRoutes.verifyForgotPasswordOtp, { email, otp });
    console.log(response);

    return response.data.token
  } catch (err) {
    console.log("Error occured during otp verification", err);
    throw err
  }
};

//To reset the password 
export const resetPassword = async (token, email, password) => {
  try {
    const response = await API.patch(userRoutes.resetPassword, { token, email, password })
    return response
  } catch (err) {
    console.log("Error occured during otp verification", err);
    throw err
  }
}

//TO update user profile 
export const updateProfile = async (profile) => {
  try {
    const response = await API.put(userRoutes.updateProfile, { profile });
    return response;
  } catch (err) {
    console.log('Error updating profile', err);
    throw err;
  }
};

// To update the user password 
export const updatePassword = async (newPassword) => {
  try {
    const response = await API.put(userRoutes.updatePassword, { newPassword });
    return response;
  } catch (err) {
    console.log('Error updating password', err);
    throw err;
  }
};

// To update the user identity 
export const updateIdentity = async (images) => {
  try {
    const response = await API.put(userRoutes.updateIdentity, { images })
    return response
  } catch (err) {
    console.log('Error updating identity', err);
    throw err;
  }
};

//To update the bank account details 
export const updateBankAccount = async (bankAccount) => {
  try {
    const response = await API.put(userRoutes.updateBankAccount, bankAccount);
    return response;
  } catch (err) {
    console.log('Error updating bank account', err);
    throw err;
  }
};

//To add a new accommodation
export const addHotel = async (hotelData) => {
  try {
    const response = await API.post(userRoutes.addHotel, hotelData);
    return response;
  } catch (err) {
    console.log("Error occurred while adding hotel", err);
    throw err;
  }
};

//To get the all accommodation of a user 
export const getMyHotels = async () => {
  try {
    const response = await API.get(userRoutes.getMyHotels)
    return response
  } catch (err) {
    console.log("Error occurred while getting hotels", err);
    throw err;
  }
}

// To get get the detial of single accommodation of a user 
export const getHotelData = async (hotelId) => {
  try {
    const response = await API.get(`${userRoutes.getHotelData}/${hotelId}`)
    return response
  } catch (err) {
    console.log("Error occurred while fetching hotel details", err);
    throw err;
  }
}

//To update accommodation details
export const editHotel = async (hotelData) => {
  try {
    const response = await API.put(userRoutes.updateHotel, hotelData);
    return response;
  } catch (err) {
    console.log("Error occurred while editing hotel", err);
    throw err;
  }
};

// To get all accommodation
export const getAllHotels = async (searchData) => {
  try {
    console.log('searchdata', searchData);

    const response = await API.get(userRoutes.getAllHotels, { params: searchData })
    return response
  } catch (err) {
    console.log('Error occured while getting hotel informations');
    throw err
  }
}

//To check an accommodation is available at a particular date
export const checkAvailability = async (accommodationId, checkIn, checkOut) => {
  try {
    const response = await API.get(userRoutes.checkAvailability, { params: { accommodationId, checkIn, checkOut } });
    return response.data.isAvailable;
  } catch (err) {
    console.error('Error checking availability:', err);
    throw err;
  }
};

//To pay the bill
export const createPaymentIntent = async (amount) => {
  try {
    const response = await API.post(userRoutes.createPaymentIntent, { amount });
    return response
  } catch (err) {
    console.error('Error creating payment intent:', err);
    throw err;
  }
};

//To create a booking
export const createBooking = async (accommodationId, checkIn, checkOut, guests, totalPrice) => {
  try {
    const response = await API.post(userRoutes.createBooking, { accommodationId, checkIn, checkOut, guests, totalPrice });
    return response
  } catch (err) {
    console.error('Error creating booking:', err);
    throw err;
  }
};

//To get all the accommodation a user booked
export const getBookedHotels = async () => {
  try {
    const response = await API.get(userRoutes.getBookedHotels)
    return response
  } catch (err) {
    console.log("Error occurred while getting hotels", err);
    throw err;
  }
}

//To get all the guests of a user
export const getSchedule = async (hotelId) => {
  try {
    const response = await API.get(`${userRoutes.getSchedule}/${hotelId}`)
    console.log('response in api', response);

    return response
  } catch (err) {
    console.log("Error occurred while getting guest details", err);
    throw err;
  }
}

//To get user token
export const getToken = async () => {
  try {
    const response = await API.get(userRoutes.getToken)
    return response
  } catch (error) {
    throw error
  }
}

//To get the chats messages
export const getMessages = async (receiverId) => {
  try {
    const response = await API.get(`${userRoutes.getMessage}/${receiverId}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching messages:', err);
    throw err;
  }
}

//To send message
export const sendMessage = async (receiverId, message) => {
  try {
    console.log(receiverId,message);
    
    const response = await API.post(`${userRoutes.sendMessage}`, { receiverId, message });
    return response;
  } catch (err) {
    console.error("Error occurred while sending message", err);
    throw err;
  }
}

export const getMessagedUsers=async()=>{
  try {
    const response=await API.get(userRoutes.getMessagedUsers)
    return response.data
  } catch (err) {
    console.error('Error fetching messaged users', err);
    throw err;
  }
}

export default userRegister
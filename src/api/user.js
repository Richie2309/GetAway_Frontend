import API from "../services/axios"
import userRoutes from "../services/endpoints/userEndpoints"

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

export const googleLogin = async (name,email) => {
    try {
      const response = await API.post(userRoutes.googAuth, { name, email });
      return response;
    } catch (err) {
      console.log("Error occurred during Google login", err);
      throw err;
    }
  };

  export const getUserData=async()=>{
    try {
        const response = await API.get(userRoutes.getUser)
        return response 
    } catch (err) {
        console.log('Error getting user data');
        throw err
    }
  }

  export const updateProfile = async (profile) => {
    try {
      const response = await API.patch(userRoutes.updateProfile); 
      return response;
    } catch (err) {
      console.log('Error updating profile', err);
      throw err;
    }
  };
  
  export const updatePassword = async (newPassword) => {
    try {
      const response = await API.patch(userRoutes.updatePassword, { newPassword });
      return response;
    } catch (err) {
      console.log('Error updating password', err);
      throw err;
    }
  };
  
  export const updateIdentity = async (link) => {
    try {
      const response = await API.patch(userRoutes.updateIdentity, { link }); 
      return response;
    } catch (err) {
      console.log('Error updating identity', err);
      throw err;
    }
  };
  
  export const updateBankAccount = async (bankAccount) => {
    try {
      const response = await API.patch(userRoutes.updateBankAccount, bankAccount); 
      return response;
    } catch (err) {
      console.log('Error updating bank account', err);
      throw err;
    }
  };

export default userRegister
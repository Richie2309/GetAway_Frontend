import { combineReducers, configureStore } from "@reduxjs/toolkit";
import OtpSlice from "../slice/OtpSlice";
import userAuthSlice from "../slice/userAuthSlice";
// import adminAuthReducer from '../slice/adminAuthSlice'

const rootReducer = combineReducers({
    otpVerification: OtpSlice,
    userAuth: userAuthSlice,
    // adminAuth: adminAuthReducer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;
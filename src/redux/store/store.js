import { combineReducers, configureStore } from "@reduxjs/toolkit";
import OtpSlice from "../slice/OtpSlice";

const rootReducer = combineReducers({
    otpVerification: OtpSlice
})

const store = configureStore({
    reducer: rootReducer
})

export default store
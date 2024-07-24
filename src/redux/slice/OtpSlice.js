import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    otpVerified: false,
};

const OtpSlice = createSlice({
    name: "otpVerification",
    initialState,
    reducers: {
        verified: (state) => {
            state.otpVerified = true;
        },
        unverified: (state) => {
            state.otpVerified = false;
        }
    }
});

export const { verified, unverified } = OtpSlice.actions;
export default OtpSlice.reducer;

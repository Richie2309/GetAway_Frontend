import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
    userData: null
};

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
            localStorage.setItem("isAuthenticated", JSON.stringify(true))
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userData=null
            localStorage.removeItem("isAuthenticated")
        },
        userData: (state, action) => {
            state.userData = action.payload
        },
        updateName: (state, action) => {
            state.userData.fullName = action.payload
        },
    }
});

export const { login, logout, userData,updateName } = userAuthSlice.actions;
export default userAuthSlice.reducer;

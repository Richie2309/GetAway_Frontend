import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
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
            localStorage.removeItem("isAuthenticated")
        }
    }
});

export const { login, logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;

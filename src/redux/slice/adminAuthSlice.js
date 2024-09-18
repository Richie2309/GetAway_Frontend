import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAdminAuthenticated: false
}

const authSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAdminAuthenticated = true
        },
        logout: (state) => {
            state.isAdminAuthenticated = false
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
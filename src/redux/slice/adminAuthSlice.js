import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAdminAuthenticated: false
}

const adminAuthSlice = createSlice({
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

export const { login, logout } = adminAuthSlice.actions
export default adminAuthSlice.reducer
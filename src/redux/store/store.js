import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "../slice/userAuthSlice";
// import adminAuthReducer from '../slice/adminAuthSlice'

const rootReducer = combineReducers({
    userAuth: userAuthSlice,
    // adminAuth: adminAuthReducer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;
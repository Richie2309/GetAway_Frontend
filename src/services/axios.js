import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

// // Request Interceptor (add access token to headers)
// API.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('accessToken'); 
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Response Interceptor (handle expired access token)
API.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        // Check if the error status is 401 (Unauthorized) and token is expired
        if (error.response?.status === 401 && ((error.response.data.error === "Access denied") || ((error.response.data.message === "Invalid token")))) {
            originalRequest._retry = true;
            try {                
                await API.post(`/refresh-token`);
                return API(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default API  

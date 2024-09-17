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
// API.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
        
//         // Check if the error status is 401 (Unauthorized) and token is expired
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 // Make a call to refresh the access token
//                 const response = await axios.get('http://localhost:3000/auth/refresh-token', { withCredentials: true });
//                 console.log('inaxios',response.data);
                
//                 const newAccessToken = response.data.accessToken;

//                 // Store the new access token in localStorage
//                 localStorage.setItem('accessToken', newAccessToken);

//                 // Update the Authorization header and retry the request
//                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//                 return API(originalRequest);
//             } catch (err) {
//                 // Redirect to login page if refresh token also fails
//                 // window.location.href = '/login';
//                 return Promise.reject(err);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

export default API  

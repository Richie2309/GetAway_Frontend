import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Make sure to import these icons
import { useForm } from 'react-hook-form';
import API from '../../services/axios';
import adminLoginImage from '../../assets/bgadmin.png';
import adminRoutes from '../../services/endpoints/adminEndpoints';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const response = await API.post(adminRoutes.login, { email, password });
      if (response.status === 200) {
        navigate('/admin/dashboard');
      } else {
        setBackendError({ email: '', password: 'Invalid email or password' });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 401) {
          setBackendError({ email: '', password: 'Invalid email or password' });
        } else {
          setBackendError({ email: '', password: 'An error occurred. Please try again.' });
        }
      } else {
        setBackendError({ email: '', password: 'An unexpected error occurred.' });
      }
    }
  };

  const clearErrorsOnChange = () => {
    setBackendError({ email: '', password: '' });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-no-repeat bg-cover bg-center fixed inset-0" style={{ backgroundImage: `url(${adminLoginImage})` }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-6">Admin Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
              onChange={clearErrorsOnChange}
              onKeyDown={handleKeyDown}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            {backendError.email && <p className="text-red-500 text-xs mt-1">{backendError.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
                onChange={clearErrorsOnChange}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            {backendError.password && <p className="text-red-500 text-xs mt-1">{backendError.password}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
import React, { useState } from 'react';
import getawayLogo from '../../assets/GetAway_logo_admin.png';
import adminLoginImage from '../../assets/adminLogin.png';
import { useForm } from 'react-hook-form';
import API from '../../services/axios';
import adminRoutes from '../../services/endpoints/adminEndpoints';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [backendError, setBackendError] = useState({ email: '', password: '' });
  const navigate = useNavigate();

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
        }
      }
    }
  };

  const clearErrorsOnChange = () => {
    setBackendError({ email: '', password: '' });
  };

  return (
    <div className="relative h-screen w-screen font-poppins">
      <img src={adminLoginImage} alt="Background of a beautiful pool at sunset" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <div className="absolute top-4 left-4 text-white text-xl font-bold">ADMIN</div>
        <img className="mx-14 object-cover h-14 absolute top-4 text-center" src={getawayLogo} alt="GetAway Logo" />
        <div className="bg-white bg-opacity-80 dark:bg-zinc-800 dark:bg-opacity-80 p-8 rounded-lg shadow-lg w-80">
          <h2 className="text-center text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
              <input
                type="email"
                id="email"
                className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-600'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
                onChange={clearErrorsOnChange}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              {backendError.email && <p className="text-red-500 text-xs mt-1">{backendError.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
              <input
                type="password"
                id="password"
                className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-600'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
                onChange={clearErrorsOnChange}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              {backendError.password && <p className="text-red-500 text-xs mt-1">{backendError.password}</p>}
            </div>
            <button type="submit" className="w-full bg-[#65AEF2] text-primary-foreground py-2 px-4 rounded-[20px] hover:bg-[#65AEF2]/80">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

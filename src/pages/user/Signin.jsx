import React, { useState } from 'react'
import signinform from '../../assets/SignPage.png'
import userRoutes from '../../services/endpoints/userEndpoints';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import API from '../../services/axios';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { googleLogin } from '../../api/user';
import { login, userData } from '../../redux/slice/userAuthSlice';
import SignupOtp from './SignupOtp';


const Signin = () => {


  const { register, handleSubmit, formState: { errors } } = useForm();
  const [backendError, setBackendError] = useState({ email: '', password: '' });
  const [gotoOtp, setGotoOtp] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;

      const response = await API.post(userRoutes.login, { email, password })
      console.log('response.data', response.data);
      if (response.data.message == 'Successfuly login') {
        dispatch(login())
        dispatch(userData(response.data.userData))
        navigate('/')
      } else {
        setGotoOtp(true)
        toast.error('Account is not verified, please verify');
      }
    } catch (err) {
      console.error('Error during login:', err);
      if (axios.isAxiosError(err)) {
        const { message, errorField } = err.response.data;
        if (errorField === 'email') {
          setBackendError({ ...backendError, email: 'This email is not registered' });
        } else if (errorField === 'password') {
          setBackendError({ ...backendError, password: 'The provided password is incorrect' });
        } else if (errorField === 'otp') {
          setGotoOtp(true)
          toast.error('Account is not verified, please verify');
        }
      }
    }
  }

  const clearErrorsOnChange = (e) => {
    setBackendError('');
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decodedCredential = jwtDecode(credentialResponse.credential)
      const { name, email } = decodedCredential
      console.log('Google credential decoded:', decodedCredential);

      const response = await googleLogin(name, email)
      if (response.status == 200) {
        console.log('yeej login google');
        dispatch(login())
        navigate('/');
      }

    } catch (err) {
      console.error('Google login error:', err);
      toast.error('Google login failed, please try again');
    }
  }

  return (
    <>
      {!gotoOtp ? (
        <div className="flex items-center justify-center min-h-screen bg-zinc-100 font-poppins p-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
            <div className="w-full md:w-1/2 h-48 md:h-auto">
              <img
                src={signinform}
                alt="Beautiful beach view"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">Login</h2>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Email"
                    onChange={clearErrorsOnChange}
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                  {backendError.email && <p className="text-red-600 text-sm mt-1">{backendError.email}</p>}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register('password', {
                      required: 'Password is required',
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        message: 'Password must be at least 8 characters long and include letters, at least one digit, and a symbol'
                      }
                    })}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                  {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
                  {backendError.password && <p className="text-red-600 text-sm mt-1">{backendError.password}</p>}
                  <Link to={'/forgotpassword'}><span className="text-blue-500 flex justify-end mt-1 text-sm">Forgot password?</span></Link>
                </div>
                <div>
                  <button
                    className='flex w-full items-center justify-center rounded-[20px] bg-red-600/50 px-4 py-2 md:px-44 md:py-[8.9px]'
                  >
                    <div className="font-poppins text-center text-sm leading-[normal] tracking-[0px]" >
                      Login
                    </div>
                  </button>
                </div>
              </form>
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-zinc-300"></div>
                <span className="mx-4 text-zinc-500 text-sm">or continue with</span>
                <div className="flex-grow border-t border-zinc-300"></div>
              </div>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    console.log('Login Failed');
                    toast.error('Google login failed, please try again');
                  }}
                />
              </div>
              <p className="mt-4 text-center text-sm text-zinc-600">
                Don't have an account yet?<Link to={'/signup'}><span className="text-red-600"> Sign up</span></Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <SignupOtp />
      )
      }
    </>
  )
}

export default Signin

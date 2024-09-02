import React, { useState } from 'react'
import signinform from '../../assets/SignPage.png'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import userRoutes from '../../services/endpoints/userEndpoints';
import API from '../../services/axios';
import SignupOtp from './SignupOtp';
import axios from 'axios';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [error, setError] = useState('');
  const [gotoOtp, setGotoOtp] = useState(false)

  const onSubmit = async (data) => {
    try {
      const { fullName, email, password } = data;

      const response = await API.post(userRoutes.register, { fullName, email, password })
      if (response.data.message == 'User registered, OTP sent') {
        setGotoOtp(true)
      }
    } catch (err) {

      console.error('Error during registration:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response.data.message)
      }
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">Sign up</h2>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">
                    Fullname
                  </label>
                  <input
                    type="text"
                    {...register('fullName', { required: 'Fullname is required' })}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Fullname"
                  />
                  {errors.fullName ? <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p> : <p className="invisible">-</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Email"
                  />
                  {errors.email ? <p className="text-red-600 text-sm mt-1">{errors.email.message}</p> : <p className="invisible">-</p>}
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">
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
                  {errors.password ? <p className="text-red-600 text-sm mt-1">{errors.password.message}</p> : <p className="invisible">-</p>}
                </div>
                <div>
                  <button className='flex w-full items-center justify-center rounded-[20px] bg-red-600/50 px-4 py-2 md:px-12 md:py-[8.9px]'>
                    <div className="font-poppins text-center text-sm leading-[normal] tracking-[0px]" >
                      Sign up
                    </div>
                  </button>
                </div>
              </form>
              {/* <div className="flex items-center my-4">
        <div className="flex-grow border-t border-zinc-300"></div>
        <span className="mx-4 text-zinc-500 text-sm">or continue with</span>
        <div className="flex-grow border-t border-zinc-300"></div>
      </div>
      <div className="flex justify-center">
         Google sign-up button can be added here 
      </div> */}
              <p className="mt-4 text-center text-sm text-zinc-600">
                Already have an account?<Link to={'/login'} ><span className="text-red-600"> Login</span></Link>
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

export default Signup
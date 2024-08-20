import React, { useState } from 'react'
import signinform from '../../assets/SignPage.png'
import { resetPassword } from '../../api/user'
import { useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd'; // Import message from antd

const ResetPassword = () => {
  const { state } = useLocation();
  const { email, token } = state || {}; 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate=useNavigate()

  const validateForm = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password) newErrors.password = 'Password is required';
    else if (!passwordRegex.test(password))
      newErrors.password = 'Password must meet the requirements';

    if (!confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    return newErrors;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }));
  };

  const handleSubmit = async (e) => {
    console.log(email);
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        await resetPassword(token,email, password);
        message.success('Password updated successfully', 2)
        navigate('/login')
      } catch (error) {
        console.log('Error updating password', error);
        message.error('Failed to update password');
      }
    }
  };

  return (
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">Reset Your Password</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                New Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                value={password}
                onChange={handlePasswordChange}
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}

            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-700">
                Confirm New Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
            <p className="text-primary text-sm mt-2">
              Password requirements:
              <br />• At least 8 characters long <br />• Contains letters, at least one digit, and a symbol
            </p>
            <div>
              <button
                type="submit"
                className='flex w-full items-center justify-center rounded-[20px] bg-red-600/50 px-4 py-2 md:px-44 md:py-[8.9px]'
              >
                <div className="font-poppins text-center text-sm leading-[normal] tracking-[0px]">
                  Confirm
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword
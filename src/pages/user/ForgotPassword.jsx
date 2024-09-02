import React, {  useState } from 'react'
import signinform from '../../assets/SignPage.png'
import { checkMail } from '../../api/user';
import OTP from './OTP';

const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await checkMail(email);
      if (response.data.exists) {
        setShowOTP(true);
      } else {
        setError('Email does not exist.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 font-poppins p-4">
      {showOTP ? (
        <OTP email={email}/>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full md:w-3/4 max-w-4xl">
          <div className="w-full md:w-1/2 h-48 md:h-auto">
            <img
              src={signinform}
              alt="Beautiful beach view"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">Forgot your password?</h2>
            <p className="text-sm md:text-base mb-4">
              No problem! <br />
              Enter your email address and we will send you a code for the password reset.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className='flex w-full items-center justify-center rounded-[20px] bg-red-600/50 px-4 py-2 md:px-12 md:py-[8.9px]'
                >
                  <div className="font-poppins text-center text-sm md:text-base leading-[normal] tracking-[0px]">
                    {loading ? 'Sending...' : 'Send reset code'}
                  </div>
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword
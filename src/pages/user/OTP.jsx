import React from 'react'
import signinform from '../../assets/SignPage.png'


const OTP = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-100 font-poppins p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full md:w-3/4 max-w-4xl">
                <div className="w-full md:w-1/2 h-48 md:h-auto">
                    <img
                        src={signinform}
                        alt="Beautiful beach view"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">Check your email</h2>
                    <p className="text-sm md:text-base mb-4">
                        If you have a GetAway account with the email address
                        you just entered, you should have an email from us
                        with a code for resetting your password.
                    </p>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="code" className="block text-sm font-medium text-zinc-700">
                                Enter the code
                            </label>
                            <input
                                type="text"
                                id="code"
                                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Enter code"
                            />
                        </div>

                        <div>
                            <button className='flex w-full items-center justify-center rounded-[20px] bg-red-600/50 px-4 py-2 md:px-12 md:py-[8.9px]'>
                                <div className="font-poppins text-center text-sm md:text-base leading-[normal] tracking-[0px]">
                                    Confirm
                                </div>
                            </button>
                        </div>
                    </form>

                    <p className="mt-4 text-center text-sm md:text-base text-zinc-600 flex flex-col md:flex-row md:justify-end items-center">
                        <span>Did not arrive?</span>
                        <a href="#" className="text-primary hover:underline ml-1">
                            <span className="text-blue-500">Try resending</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OTP
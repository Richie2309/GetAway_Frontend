import React from 'react'
import signinform from '../../assets/SignPage.png'


const OTP = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-100 font-poppins">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex w-3/4 max-w-4xl">
                <div className="w-1/2">
                    <img
                        src={signinform}
                        alt="Beautiful beach view"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-1/2 p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center">Check your email</h2>
                    <p>If you have a GetAway account with the email address
                        you just entered, you should have an email from us
                        with a code for resetting your password.</p><br />
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                                Enter the code
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Email"
                            />
                        </div>

                        <div>
                            <button className='flex w-full items-center justify-center rounded-[20px] bg-red-600/50 px-12 py-[8.9px]'>
                                <div className="font-poppins flex-grow text-center text-sm leading-[normal] tracking-[0px]" >
                                    Confirm
                                </div>
                            </button>
                        </div>
                    </form>
                    
                    <p className="mt-4 text-center text-sm text-zinc-600 flex justify-end">
                        Did not arrive? <a href="#" className="text-primary hover:underline"><span className="text-blue-500">Try resending</span></a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OTP
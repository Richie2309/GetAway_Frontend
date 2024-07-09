import React from 'react'
import signinform from '../../assets/SignPage.png'
import { Link } from 'react-router-dom'

const Signin = () => {
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
                    <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Password"
                            />
                            
                            <Link to={'/forgotpassword'}><span className="text-blue-500 flex justify-end m-1">Forgot password?</span></Link>
                        </div>
                        <div>
                            <button
                                className='flex w-full items-center justify-center rounded-[20px] bg-red-600/50 px-44 py-[8.9px]'
                            >
                                <div className="font-poppins flex-grow text-center text-sm leading-[normal] tracking-[0px]" >
                                    Login
                                </div>
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-zinc-300"></div>
                        <span className="mx-4 text-zinc-500">or continue with</span>
                        <div className="flex-grow border-t border-zinc-300"></div>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-white border border-zinc-300 rounded-md p-2 hover:bg-zinc-50">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_56_1132)">
                                    <path d="M10.4508 0.986669C7.45329 2.02652 4.86828 4.00018 3.07542 6.61777C1.28256 9.23535 0.376358 12.3589 0.489915 15.5296C0.603472 18.7002 1.7308 21.7509 3.70632 24.2335C5.68184 26.7162 8.40142 28.4999 11.4656 29.3226C13.9498 29.9636 16.5525 29.9918 19.05 29.4046C21.3124 28.8964 23.4041 27.8094 25.1203 26.25C26.9064 24.5773 28.2029 22.4495 28.8703 20.0953C29.5955 17.5351 29.7246 14.8428 29.2476 12.2249H15.2976V18.0117H23.3765C23.2151 18.9346 22.8691 19.8155 22.3592 20.6016C21.8494 21.3877 21.1862 22.0629 20.4093 22.5867C19.4229 23.2395 18.3108 23.6786 17.1445 23.8757C15.9748 24.0933 14.7751 24.0933 13.6054 23.8757C12.4199 23.6309 11.2983 23.1416 10.3125 22.439C8.72845 21.3177 7.53906 19.7248 6.91403 17.8875C6.27862 16.0157 6.27862 13.9866 6.91403 12.1148C7.35894 10.8028 8.09443 9.60824 9.0656 8.62026C10.177 7.46889 11.584 6.64588 13.1324 6.24153C14.6807 5.83719 16.3105 5.86713 17.8429 6.32807C19.0401 6.6954 20.1349 7.33748 21.0398 8.20307C21.9508 7.29682 22.8601 6.38823 23.7679 5.47729C24.2367 4.98745 24.7476 4.52104 25.2093 4.01948C23.8278 2.73398 22.2062 1.73363 20.4375 1.07573C17.2165 -0.093824 13.6921 -0.125255 10.4508 0.986669Z" fill="white" />
                                    <path d="M10.4508 0.986831C13.6918 -0.125848 17.2162 -0.0952446 20.4375 1.07355C22.2065 1.73592 23.8274 2.74108 25.207 4.03136C24.7383 4.53293 24.2437 5.00167 23.7656 5.48917C22.8562 6.39699 21.9476 7.30167 21.0398 8.20324C20.1349 7.33764 19.0401 6.69556 17.8429 6.32824C16.311 5.86568 14.6813 5.834 13.1325 6.2367C11.5838 6.63939 10.1759 7.46088 9.06326 8.61105C8.09208 9.59902 7.3566 10.7936 6.91169 12.1056L2.0531 8.34386C3.79218 4.89518 6.80329 2.2572 10.4508 0.986831Z" fill="#E33629" />
                                    <path d="M0.764068 12.0703C1.02502 10.776 1.45858 9.52264 2.05313 8.34375L6.91172 12.1148C6.27631 13.9866 6.27631 16.0157 6.91172 17.8875C5.29297 19.1375 3.67344 20.3938 2.05313 21.6563C0.565202 18.6945 0.11141 15.3199 0.764068 12.0703Z" fill="#F8BD00" />
                                    <path d="M15.2977 12.2227H29.2477C29.7246 14.8405 29.5955 17.5328 28.8703 20.093C28.2029 22.4472 26.9065 24.575 25.1203 26.2477C23.5524 25.0242 21.9774 23.8102 20.4094 22.5867C21.1868 22.0624 21.8503 21.3865 22.3601 20.5995C22.87 19.8126 23.2157 18.9308 23.3766 18.007H15.2977C15.2953 16.0805 15.2977 14.1516 15.2977 12.2227Z" fill="#587DBD" />
                                    <path d="M2.05078 21.6562C3.67109 20.4062 5.29062 19.15 6.90937 17.8875C7.53564 19.7254 8.72673 21.3185 10.3125 22.439C11.3014 23.1383 12.4254 23.6236 13.6125 23.864C14.7822 24.0816 15.9819 24.0816 17.1516 23.864C18.3179 23.6669 19.43 23.2278 20.4164 22.575C21.9844 23.7984 23.5594 25.0125 25.1273 26.2359C23.4115 27.7962 21.3197 28.884 19.057 29.3929C16.5596 29.98 13.9569 29.9519 11.4727 29.3109C9.50789 28.7863 7.67268 27.8615 6.08203 26.5945C4.39858 25.2577 3.02352 23.5732 2.05078 21.6562Z" fill="#319F43" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_56_1132">
                                        <rect width="30" height="30" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                    <p className="mt-4 text-center text-sm text-zinc-600">
                        Don’t have an account yet?<Link to={'/signup'}><span className="text-red-600"> Sign up</span></Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signin

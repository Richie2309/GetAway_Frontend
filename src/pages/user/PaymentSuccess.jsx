import React from 'react'

const PaymentSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-6">All Done</h1>

                <div className="mb-6">
                    <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center mx-auto">
                        <svg className="w-12 h-12 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <h2 className="text-xl font-semibold mb-2">Payment Received Successfully</h2>
                <p className="text-gray-600 mb-6">Your booking has been confirmed!</p>

                <button className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300">
                    Back to Home
                </button>
            </div>
        </div>
    )
}

export default PaymentSuccess
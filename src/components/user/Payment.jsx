import React from 'react'

const Payment = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Confirm and Pay</h1>
            <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1">
                    <div className="flex gap-4 mb-4">
                        <img src="https://placehold.co/100x100" alt="Thalassery, Kerala" className="w-32 h-32 object-cover rounded-md" />
                        <div className="bg-card p-4 rounded-md flex-1">
                            <h2 className="font-bold">Thalassery, Kerala</h2>
                            <p>4 guests, 2 bedrooms, 2 beds</p>
                            <p className="font-bold">₹6000 per night</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-bold">Dates</h3>
                        <p>12/1/2024 - 14/1/2024</p>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-bold">Guests</h3>
                        <p>2 guests</p>
                    </div>
                    <h3 className="font-bold mb-2">Pay with</h3>
                    <p className="mb-4">Credit or debit card</p>
                    <div className="bg-card p-4 rounded-md shadow-md mb-4">
                        <div className="mb-4">
                            <label className="block mb-2">Card number</label>
                            <input type="text" className="w-full p-2 border rounded-md" />
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1">
                                <label className="block mb-2">Expiration</label>
                                <input type="text" className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2">CVV</label>
                                <input type="text" className="w-full p-2 border rounded-md" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Cardholder name</label>
                            <input type="text" className="w-full p-2 border rounded-md" />
                        </div>
                    </div>
                    <button className="w-full bg-destructive text-destructive-foreground p-3 rounded-md hover:bg-destructive/80">Confirm and pay</button>
                </div>

                <div className="bg-card p-4 rounded-md shadow-md w-full md:w-1/3">
                    <h3 className="font-bold mb-4">Price details</h3>
                    <p>₹2000 x 2 nights</p>
                    <div className="flex justify-between mt-4">
                        <span className="font-bold">Total</span>
                        <span className="font-bold">₹4000</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
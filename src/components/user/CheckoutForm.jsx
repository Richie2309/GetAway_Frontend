import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ clientSecret, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          // You can add billing details if needed
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        onSuccess(); 
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="cardNumber">Card Number</label>
        <CardNumberElement id="cardNumber" className="border p-2 rounded" />
      </div>
      <div className="mb-4">
        <label htmlFor="cardExpiry">Expiry Date</label>
        <CardExpiryElement id="cardExpiry" className="border p-2 rounded" />
      </div>
      <div className="mb-4">
        <label htmlFor="cardCvc">CVC</label>
        <CardCvcElement id="cardCvc" className="border p-2 rounded" />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button type="submit" disabled={!stripe || processing} className="bg-blue-500 text-white py-2 px-4 rounded">
        {processing ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

export default CheckoutForm;

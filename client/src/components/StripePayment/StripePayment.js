import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const StripePayment = () => {

    const element = useElements();
    console.log('element', element)
    const stripe = useStripe()
    console.log('stripe', stripe)

    return (
        <div>
            <form>
                <PaymentElement />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default StripePayment;
import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const PayButton = () => {

    const cartItem = useSelector((state) => state.cart.cartItem)
    console.log(cartItem)

    const handleCheckout = () => {
        axios.post('http://localhost:5000/create-checkout-session', {
            cartItem,
            userId: 'stripetesting@gmail.coom'
        }).then((res) => {
            if(res.data.url) {
                window.location.href = res.data.url
            }
        }).catch((err) => console.log(err.messagess))
    }

    return (
        <div>
            <button onClick={() => handleCheckout()}>Check Out</button>
        </div>
    );
};

export default PayButton;
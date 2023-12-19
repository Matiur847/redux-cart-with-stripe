import React from 'react';
import './Cart.css'
import { Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../CartItem/CartItem';
import { cartUiActions } from '../../store/cartUiSlice';
import axios from 'axios';


const Cart = () => {

    const cartItem = useSelector((state) => state.cart.cartItem)

    const handleCheckout = () => {
        axios.post('http://localhost:5000/create-checkout-session', {
            cartItem,
            userId: 'stripetesting@gmail.coom'
        }).then((res) => {
            if (res.data.url) {
                window.location.href = res.data.url
            }
        }).catch((err) => console.log(err.messagess))
    }



    console.log(cartItem)
    const totalAmount = useSelector((state) => state.cart.totalAmount)
    const inTotal = totalAmount.toFixed(2)
    const dispatch = useDispatch()
    const toggleCart = () => {
        dispatch(cartUiActions.toggle())
    }

    return (
        <div className='cart-container'>
            <ListGroup className='cart'>
                <div className="cart-close">
                    <span onClick={toggleCart}>
                        <i class="ri-close-fill"></i>
                    </span>
                </div>

                <div className="cart-item-list">

                    {
                        cartItem.length === 0 ? (
                            <h6 className="text-center mt-5">No item added to the cart</h6>
                        ) : (
                            cartItem.map((item, index) => (
                                <CartItem item={item} key={index} />
                            ))
                        )
                    }

                </div>
                <div className="cart-bottom text-center align-items-center justify-content-between">
                    <h6>Total Amount: <span>${inTotal}</span></h6>
                    <Button onClick={handleCheckout} className='w-100'>
                            Process to Checkout
                    </Button>
                </div>
            </ListGroup>
        </div>
    );
};

export default Cart;
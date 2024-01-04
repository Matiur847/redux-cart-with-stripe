import React, { useState } from 'react';
import './Cart.css'
import { Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../CartItem/CartItem';
import { cartUiActions } from '../../store/cartUiSlice';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';


const Cart = () => {

    const [loading, setLoading] = useState(false)
    const [click, setClick] = useState(false)
    const [stripeRes, setStripeRes] = useState();
    localStorage.setItem('stripePayData', JSON.stringify(stripeRes))

    const cartItem = useSelector((state) => state.cart.cartItem)
    const auth = getAuth()

    // console.log(cartItem)

    const handleCheckout = async () => {
        setClick(true)
        if (cartItem.length > 2) {
            toast.error("Max order 2 items", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2000
            })
            setClick(false)
        }
        else if (auth.currentUser) {
            setLoading(true)
            axios.post('http://localhost:5000/create-checkout-session', {
                cartItem,
                email: JSON.parse(localStorage.getItem('user'))?.user.email,
                userUid: JSON.parse(localStorage.getItem('user'))?.user.uid,
                userId: 'stripetesting@gmail.coom'
            }).then((res) => {
                setStripeRes(res)
                if (res.data.url) {
                    window.location.href = res.data.url
                }
            }).catch((err) => {
                setLoading(false)
                console.log(err.messagess)
            })
        }
        
        else {
            toast.error("Please Login/sign up first", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2000
            })
        }
    }

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
                        <i className="ri-close-fill"></i>
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
                    <Button onClick={handleCheckout} className='w-100' disabled={cartItem.length === 0}>
                        {
                            click === true ? (
                                <div>
                                    {loading && <Loader />}
                                </div>
                            ) : <>
                                    Process to Checkout
                            </>
                        }
                    </Button>
                </div>
            </ListGroup>
        </div>
    );
};

export default Cart;
import axios from 'axios';
import './Checkout.css'
import React, { useEffect, useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

const Checkout = () => {
    const [totalAmount, setTotalAmount] = useState('')

    const cartItem = useSelector((state) => state.cart.cartItem)

    useEffect(() => {
        let price = 0
        setTotalAmount(price.toFixed(2))

    }, [cartItem])
    console.log(totalAmount)

    const payment = (token) => {
        axios.post('http://localhost:8000/pay', {
            amount: totalAmount * 100,
            token: token
        })
    }

    return (
        <div className='checkout-section'>
            <Container>
                <Row>
                    <Col md='6'>
                        <div className="checkout-product">
                            <p className='checkout-totalPay text-end'>All Cart Product</p>
                            {
                                cartItem.map((item) => (
                                    <ListGroup className='border-0 checkout-item'>
                                        <div className="checkout-item-info d-flex">
                                            <img className='w-25' src={item.img} alt="" />
                                            <div className="cart-product-info w-100 align-items-center justify-content-between gap-4 d-flex">
                                                <div className='cart-porduct-sub-info checkout-porduct-sub-info'>
                                                    <h6 className='cart-product-title'>{item.title.slice(0, 10)}</h6>
                                                    <p className='cart-product-price d-flex align-items-center gap-5'>{item.quantity}x<span>${item.price}</span></p>
                                                    <div className='increase-decrease-btn d-flex justify-content-between align-items-center gap-4'>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ListGroup>
                                ))
                            }

                        </div>
                    </Col>
                    <Col md='6'>
                        <div className="checkoutRightSection text-center">
                            <div className="checkoutPd-info">
                                <div className="checkoutPd-infoSub d-flex align-items-center justify-content-between">
                                    <p>Pay To Order</p>
                                    <p>Total Payable: ${totalAmount}</p>
                                </div>
                                <div className="dummy-card text-start">
                                    <p>Dummy card number: <span>4242 4242 4242 4242</span></p>
                                    <p>Dummy card date: <span>12/34</span></p>
                                    <p>Dummy card CVC: <span>123</span></p>
                                </div>
                            </div>
                            <StripeCheckout
                                stripeKey='pk_test_51ON6LOAdBQWGx4zViqRXkv8Xg62roCkMv4b1KArXltzDvlnPHmjuhJeU9hfIc8FHc9NNsETO0RcAzT8BmASHv8MY00kYqgULI6'
                                name='Redux Cart'
                                amount={totalAmount * 100}
                                label='Pay Now'
                                description={`Your Payment amount is $${totalAmount}`}
                                email=''
                                token={payment}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Checkout;
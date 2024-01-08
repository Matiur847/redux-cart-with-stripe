import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import './OrderHistoy.css'
import { fireDB } from '../../firebaseConfig';
import { Col, Container, Row } from 'react-bootstrap';
import Loader from '../Loader/Loader';
import fakeData from '../../FakeData/FakeData';
import Marquee from 'react-fast-marquee'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const OrderHistory = () => {

    const [loading, setLoading] = useState(false)

    const existUserUid = JSON.parse(localStorage.getItem('user'))?.user.uid
    const [order, setOrder] = useState([])

    const getOrderData = async () => {
        setLoading(true)
        try {
            const orderResult = await getDocs(collection(fireDB, 'orders'))
            let orderArray = [];
            orderResult.forEach((docs) => {
                orderArray.push(docs.data())
            })
            setLoading(false)
            setOrder(orderArray)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const ShowOrderHistory = () => order.filter((order) => order.userId === existUserUid).map((order, index) => (
        <div key={index} className='order-container'>
            <div className='d-flex center justify-content-around p-3'>
                <div>
                    <h4>Order ID: <small>{order.customerId}</small></h4>
                    <p>{order.date.m}, {order.date.y}, {order.date.t}</p>
                </div>
                <div>
                    <h4>Order Email: <small>{order.email}</small></h4>
                    <h4>Phone: <small>{order.phone}</small></h4>
                </div>
            </div>
            <div className="marque">
                <Marquee>
                    <small>Your payment is <b> complete {" "}</b> || We will get your <b>desired</b> product to you as soon as <b>possible!</b></small>
                </Marquee>
            </div>

            {
                order.cartItem.map((orderItem, index) => (
                    <>
                        {
                            fakeData.filter((item) => orderItem.id === item.id).map((orders) => (
                                <div key={index}>
                                    <div className='order-subCon'>
                                        <div className="order-image">
                                            <img src={orders.image} alt="" />
                                        </div>
                                        <div className="order-title">
                                            <h5>{orders.title.slice(0, 25)}</h5>
                                            <div className="order-subs d-flex align-items-center justify-content-between">
                                                <p>Price: ${orders.price}</p>
                                                <p>Quantity: {orderItem.quantity}</p>
                                            </div>
                                        </div>
                                        <div className='totalPrice'>
                                            <h5>Total Price: ${orderItem.totalPrice.toFixed(2)}</h5>
                                            {/* <h5>InTotal Price: ${order.amount}</h5> */}
                                            {/* <button className='header-login-btn order-paid'>
                                                Paid <i className="ri-shield-check-line"></i>
                                            </button> */}

                                            {['top'].map((placement) => (
                                                <OverlayTrigger
                                                    key={placement}
                                                    placement={placement}
                                                    overlay={
                                                        <Tooltip id={`tooltip-${placement}`}>
                                                            Payment Completed!
                                                        </Tooltip>
                                                    }
                                                >
                                                    <button className='header-login-btn order-paid'>
                                                        Paid <i className="ri-shield-check-line"></i>
                                                    </button>
                                                </OverlayTrigger>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </>
                ))
            }
            <div className='total-amount text-center pb-2'>
                <div className="borderdiv"></div>
                <h5 className='mt-2 mb-3'>InTotal Paid: ${order.amount / 100}</h5>
            </div>
        </div>
    ))

    useEffect(() => {
        getOrderData();
    }, []);

    return (
        <div>
            <Container>
                <Row>
                    {
                        <Col>
                            <div className='orderHistoy-section'>
                                <div className='Loader-div text-center'>
                                    <h1>
                                        {loading && <Loader />}
                                    </h1>
                                </div>
                                <div>
                                    {
                                        ShowOrderHistory()
                                    }
                                </div>
                            </div>
                        </Col>
                    }
                </Row>
            </Container>
        </div>
    );
};

export default OrderHistory;
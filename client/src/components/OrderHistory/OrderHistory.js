import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { fireDB } from '../../firebaseConfig';
import { Col, Container, Row } from 'react-bootstrap';
import './OrderHistoy.css'
import Loader from '../Loader/Loader';

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

    useEffect(() => {
        getOrderData();
    }, []);
    return (
        <div>
            <Container>
                <Row>
                    {
                        <Col md='12'>
                            <div className='Loader-div'>
                                <h1>
                                    {/* Hello */}
                                    {loading && <Loader />}
                                </h1>
                            </div>
                            <div>
                                {
                                        order.filter((order) => order.userId === existUserUid).map((order, index) => (
                                        <div key={index}>
                                            {
                                                order.cartItem.map((order, index) => (
                                                    <div key={index}>
                                                        <table className='table table-bordered'>
                                                            <thead>
                                                                <tr>
                                                                    <th>Image</th>
                                                                    <th>Product Title</th>
                                                                    <th>Price</th>
                                                                    <th>Quantity</th>
                                                                    <th>Total Price</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td className='order-history-img'>
                                                                        <img src={order.img} alt="" />
                                                                    </td>
                                                                    <td>{order.title.slice(0, 10)}</td>
                                                                    <td>${order.price}</td>
                                                                    <td>{order.quantity}</td>
                                                                    <td>${order.totalPrice.toFixed(2)}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        ))
                                }
                            </div>
                        </Col>
                    }
                </Row>
            </Container>
        </div>
    );
};

export default OrderHistory;
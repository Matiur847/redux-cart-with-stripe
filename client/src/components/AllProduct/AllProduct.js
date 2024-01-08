import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../AllProduct/AllProduct.css'
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart';

import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';


const AllProduct = () => {

    const dispatch = useDispatch();

    const handleAddProduct = ({ id, category, price, title, image }) => {
        dispatch(cartActions.addItem({
            id,
            category,
            price,
            image,
            title
        }))
    }

    const filteredData = useSelector((state) => state.cart.allFilterData)


    const splitData = () => filteredData.map((item, index) => (
        
            <Col className='product-col global-color' lg='3' md='4' sm='6' xs='6' key={index}>
                <Card>
                    <div>
                        <Typography level="title-lg">{item.title.slice(0, 10)}</Typography>
                    </div>
                    <AspectRatio className='global-color'>
                        <div className='Pd-img' style={{ backgroundColor: '#FBFCFE' }}>
                            <img
                                src={item.image}
                                loading="lazy"
                                alt=""
                            />
                        </div>
                    </AspectRatio>
                    <div className="card-content-footer d-flex align-items-center justify-content-between mt-2">
                        <div className="price">
                        <p>Total price: <br /> <span>${item.price}</span></p>
                        </div>
                        <div className="order-btn">
                        <Button onClick={() => handleAddProduct(item)}>Add <span><i className="ri-shopping-cart-line"></i></span></Button>
                        </div>
                    </div>
                </Card>
            </Col>
        ))


    return (
        <div className='product-section'>
            <Container>
                <Row>
                    {
                        splitData()
                    }
                </Row>
            </Container>
        </div>
    );
};

export default AllProduct;
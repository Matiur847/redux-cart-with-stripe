import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../AllProduct/AllProduct.css'
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart';

import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';


const AllProduct = () => {

    const dispatch = useDispatch();

    const handleAddProduct = ({ id, category, price, title, image}) => {
        dispatch(cartActions.addItem({
            id,
            category,
            price,
            image,
            title
        }))
        // toast('Product Added Succesfully')
    }

    const filteredData = useSelector((state) => state.cart.allFilterData)

    
    

    return (
        <div className='product-section'>
            <Container>
                <Row>
                    {
                        filteredData.map((item, index) => (
                            <Col className='product-col global-color' lg='3' md='4' sm='6' xs='6' key={index}>
                                <Card>
                                    <div>
                                        <Typography level="title-lg">{item.title.slice(0, 10)}</Typography>
                                    </div>
                                    <AspectRatio className='global-color'>
                                        <div className='Pd-img' style={{ backgroundColor: '#FBFCFE'}}>
                                            <img
                                                src={item.image}
                                                loading="lazy"
                                                alt=""
                                            />
                                        </div>
                                    </AspectRatio>
                                    <CardContent orientation="horizontal">
                                        <div>
                                            <Typography level="body-xs">Total price:</Typography>
                                            <Typography fontSize="lg" fontWeight="lg">
                                                ${item.price}
                                            </Typography>
                                        </div>
                                        <Button
                                            variant="solid"
                                            size="md"
                                            color="primary"
                                            aria-label="Explore Bahamas Islands"
                                            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                                            onClick={() => handleAddProduct(item)}
                                        >
                                            Add <span><i className="ri-shopping-cart-line"></i></span>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </div>
    );
};

export default AllProduct;
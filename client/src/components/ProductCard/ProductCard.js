import React from 'react';
import './ProductCard.css'

import fakeData from '../../FakeData/FakeData';
import { Button } from 'react-bootstrap';

const ProductCard = () => {

    return (
        <div className='single-product-section'>
            {
                fakeData.map((item) => (
                    <div className="single-product-container">
                        <div className="single-img">
                            <h3>{item.title.slice(0, 10)}</h3>
                            <img className='w-25' src={item.image} alt="" />
                        </div>
                        <div className="singlePd-info d-flex align-items-center justify-content-between">
                            <p>{item.price}</p>
                            <Button>Add</Button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ProductCard;
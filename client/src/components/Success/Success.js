import React from 'react';
import './Success.css'
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Success = () => {
    return (
        <div className='success-section d-flex align-items-center justify-content-center text-center'>
            <div className="success-card">
                <i class="ri-shield-check-line"></i>
                <h4 className='mt-2 mb-3'>Payment Successful</h4>
                <Link to='/products'>
                    <Button className='w-100'>Continue Shopping</Button>
                </Link>
            </div>
        </div>
    );
};

export default Success;
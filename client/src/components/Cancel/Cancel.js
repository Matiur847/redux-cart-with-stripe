import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cancel = () => {
    return (
        <div className='success-section d-flex align-items-center justify-content-center text-center'>
            <div className="success-card">
                <i className="ri-error-warning-line"></i>
                <h4 className='mt-2 mb-3'>Payment Cancel</h4>
                <Link to='/products'>
                    <Button className='w-100'>Shopping</Button>
                </Link>
            </div>
        </div>
    );
};

export default Cancel;
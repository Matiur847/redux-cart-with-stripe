import React from 'react';
import './Success.css'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';

const Success = () => {

    const dispatch = useDispatch()
    const path = window.location.pathname

        if (`http://localhost:3000${path}`) {
            dispatch(cartActions.clearCartItem())
        }
        else {
            console.log('PathName not detect')
        }

    return (
        <div className='success-section d-flex align-items-center justify-content-center text-center'>
            <div className="success-card">
                <i className="ri-shield-check-line"></i>
                <h4 className='mt-2 mb-3'>Payment Successful</h4>
                <div className="succes-navigate">
                    <Link to='/products'>
                        <Button>Shopping</Button>
                    </Link>
                    <Link to='/review-order'>
                        <Button>Order</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Success;
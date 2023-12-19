import React from 'react';
import './CartItem.css'
import { cartActions } from '../../store/cart';
import { useDispatch } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

const CartItem = ({ item }) => {

    const { id, title, price, img, quantity} = item

    const dispatch = useDispatch()

    const handleRemoveItem = (id) => {
        dispatch(cartActions.deleteItem(id))
    }

    const increment = () => {
        dispatch(cartActions.addItem({
            id,
            title,
            price,
            img
        }))
    }

    const decrement = (id) => {
        dispatch(cartActions.removeItem(id))
    }

    return (
    <ListGroup className='border-0 cart-item'>
        <div className="cart-item-info d-flex gap-2">
            <img src={img} alt="" />
            <div className="cart-product-info w-100 align-items-center justify-content-between gap-4 d-flex">
                <div className='cart-porduct-sub-info'>
                    <h6 className='cart-product-title'>{title.slice(0, 10)}</h6>
                        <p className='cart-product-price d-flex align-items-center gap-5'>{quantity}x<span>${price}</span></p>
                    <div className='increase-decrease-btn d-flex justify-content-between align-items-center gap-4'>
                        <span className='increase-btn' onClick={increment}><i className="ri-add-line"></i></span>
                        <span className='quantity'>{quantity}</span>
                        <span className='decrease-btn' onClick={() => decrement(item.id)}><i className="ri-subtract-line"></i></span>
                    </div>
                </div>
            </div>
            <span className='delet-btn' onClick={() => handleRemoveItem(item.id)}><i className="ri-close-line"></i></span>
        </div>
    </ListGroup>
    );
};

export default CartItem;
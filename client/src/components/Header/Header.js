import React, { useState } from 'react';
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { cartUiActions } from '../../store/cartUiSlice';
import fakeData from '../../FakeData/FakeData';
import { cartActions } from '../../store/cart';

const Header = () => {

    
    const totalQuantity = useSelector((state) => state.cart.totalQuantity)

    const dispatch = useDispatch()

    const toggleCart = () => {
        dispatch(cartUiActions.toggle())
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(fakeData);


    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        filterData(value);
    };


    const filterData = (searchTerm) => {
        const filteredData = fakeData.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filteredData);
    };

    // const setFilterData = () => {
        dispatch(cartActions.getFilteredData(filteredData))
    // }


    return (
            <div className='header-section text-center p-3 d-flex align-items-center justify-content-center gap-5 mb-5'>
                <span className='cart-icon'>
                    <i className="ri-shopping-bag-line" onClick={toggleCart}></i>
                    <sup>{totalQuantity}</sup>
                </span>
                <div>
                    <input
                        type="text"
                        placeholder="Search Product"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
    );
};

export default Header;
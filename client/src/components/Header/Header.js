import React, { useState } from 'react';
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { cartUiActions } from '../../store/cartUiSlice';
import fakeData from '../../FakeData/FakeData';
import { cartActions } from '../../store/cart';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';

const Header = () => {

    // get user form localStorage 
    const loginUser = JSON.parse(localStorage.getItem('user'))
    // console.log('loginUser', loginUser)

    const navigate = useNavigate();

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

    dispatch(cartActions.getFilteredData(filteredData))

    const auth = getAuth()
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                localStorage.clear('user')
                navigate('/login')

            })
            .catch((error) => {
                console.log(error)
            });

        toast.success('Logout Successfully', {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 2000
        })
    }

    const IsOrder = () => {
        if (loginUser) {
            navigate('/review-order')
        } else {
            toast.error('First login to view orders', {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 2000
            })
        }

    }

    return (
        <div className="header-section">
            <div className='header-section text-center p-3 d-flex align-items-center justify-content-between mb-5'>
                <div className="head-left">
                    <Link to='/products'>
                        <h3>Cart</h3>
                    </Link>
                </div>
                <div className='search-input'>
                    <input
                        type="text"
                        placeholder="Search Product"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="head-right d-flex align-items-center justify-content-center gap-3">
                    <span className='cart-icon'>
                        <i onClick={IsOrder} className="ri-store-2-line"></i>
                    </span>

                    <span className='cart-icon'>
                        <i className="ri-shopping-bag-line" onClick={toggleCart}></i>
                        <sup>{totalQuantity}</sup>
                    </span>
                    <div className="header-login-area">
                        <Link to='login'>
                            {
                                loginUser ? <div><button onClick={handleSignOut} className='header-login-btn'>Logout</button> <ToastContainer /></div> : <button className='header-login-btn'>Login</button>

                            }
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
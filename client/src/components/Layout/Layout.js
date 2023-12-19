import React from 'react';
import AllProduct from '../AllProduct/AllProduct';
import Cart from '../Cart/Cart';
import Routers from '../../routes/Routers';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';

const Layout = () => {

    const showCart = useSelector((state) => state.cartUi.cartVisible)

    return (
        <div>
            <Header />
            {
                showCart && <Cart />
            }
            <div style={{marginTop: '120px'}}>
                <Routers />
            </div>
        </div>
    );
};

export default Layout;
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AllProduct from '../components/AllProduct/AllProduct';
import Success from '../components/Success/Success';
import Cancel from '../components/Cancel/Cancel';
import RouteNoteFound from '../components/RouteNoteFound/RouteNoteFound';
import Login from '../components/Login/Login';
import Registration from '../components/Registration/Registration';
import OrderHistory from '../components/OrderHistory/OrderHistory';

const Routers = () => {
    return (<Routes>
        <Route path='/' element={<Navigate to='/products' />} />
        <Route path='/products' element={<AllProduct />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/review-order' element={<OrderHistory />} />
        {/* <Route path='/loading' element={<Loader />} /> */}
        <Route path='*' element={<RouteNoteFound />} />
    </Routes>
    );
};

export default Routers;
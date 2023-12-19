import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AllProduct from '../components/AllProduct/AllProduct';
import Success from '../components/Success/Success';
import Cancel from '../components/Cancel/Cancel';
import RouteNoteFound from '../components/RouteNoteFound/RouteNoteFound';
import ProductCard from '../components/ProductCard/ProductCard';

const Routers = () => {
    return (<Routes>
        <Route path='/' element={<Navigate to='/products' />} />
        <Route path='/products' element={<AllProduct />} />
        {/* <Route path='/cart' element={<ProductCard />} /> */}
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />
        <Route path='*' element={<RouteNoteFound />} />
    </Routes>
    );
};

export default Routers;
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import './Header.css'

const Header = () => {

    const [state, setState] = useState(false)

    const toggle = () => {
        setState(!state)
    }

    return (
        <div>
            <nav>
                <h2>Matiur</h2>
                <div className='menu-items'>
                    <ul className={state ? '#nav-items acitve ri-close-fill' : '#nav-items ri-menu-line'} id='nav-items'>
                        <li><a href="">Home</a></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Contact</a></li>
                        <li><a href="">Hire me</a></li>
                        
                    </ul>
                    <div className='mobile-menu' onClick={toggle}>
                        <i class={state ? 'ri-close-fill' : 'ri-menu-line'}></i>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
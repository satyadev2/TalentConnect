import React from 'react';
import '../src/stylesheets/Navbar.css'; // Import CSS for styling
import logo from './Images/talentconnect-high-resolution-logo-transparent.png'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="TalentConnect" className="logo" />
            </div>
            <div className="navbar-right">
                <a href="#contact">Contact</a>
                <a href="#about">About Us</a>
                <a href="#signin"><button className='bg-gray-700  text-white font-bold py-2 px-4 rounded'>Sign In</button></a>
                <a href="#signup"><button className='bg-gray-700  text-white font-bold py-2 px-4 rounded'>Sign Up</button></a>
            </div>
        </div>
    );
};

export default Navbar;

import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './Navbar';
import Search from './Search';
import Card from './Job_cards';
import Footer from './Footer';
import Sign from './Signinpage';
import '../src/stylesheets/index.css';
import Logo from './Logo';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
      <Navbar />
      <Search />
      <Logo />
      <Card />

      <Sign />
      <Footer />

    </>
  </React.StrictMode >
);


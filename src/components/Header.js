import React, { useState } from 'react';
import '../components/Header.css';
import logo from '../assets/logo.png';


const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

 
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Hotel Logo" />
      </div>
      <h1 className="site-name">CIRCUIT HOUSE DANTEWADA</h1>

      {/* Book Now and Admin buttons for desktop */}
      <div className="button-group desktop-only">
        <button className="book-now">Book Now</button>
        <button className="admin">Admin</button>
      </div>

      <button className="hamburger" onClick={toggleMobileMenu}>
        ☰
      </button>

      {/* Mobile menu with both buttons */}
      {isMobileMenuOpen && (
        <nav className="mobile-menu">
          <button className="book-now mobile-only">Book Now</button>
          <button className="admin mobile-only">Admin</button>
        </nav>
      )}
    </header>
  );
};

export default Header;

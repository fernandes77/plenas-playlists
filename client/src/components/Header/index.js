import React from 'react';
import './styles.css';
import Logo from '../Logo';

const Header = () => {
  return (
    <header>
      <a href="/" className="logo-link">
        <Logo />
      </a>
    </header>
  );
};

export default Header;

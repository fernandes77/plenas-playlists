import React from 'react';
import './styles.css';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Link to="/" className="logo-link">
        <Logo />
      </Link>
    </header>
  );
};

export default Header;

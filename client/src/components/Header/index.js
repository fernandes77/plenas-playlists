import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import Logo from '../Logo';

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

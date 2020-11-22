import React, { useEffect, useState } from 'react';
import './styles.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Landing = () => {
  const [loginUrl, setLoginUrl] = useState('http://localhost:8888/login');

  const prodOrDev = () => {
    if (window.location.href === 'https://plenas-playlists.herokuapp.com/')
      setLoginUrl('https://plenas-playlists.herokuapp.com/login');
  }

  useEffect(() => {
    prodOrDev();
  }, []);

  return (
    <>
      <Header />
      <div className="landing">
        <h1>Viva com a música.</h1>
        <p>
          Crie playlists no Spotify com a sua personalidade de maneira simples e
          rápida
        </p>
        <a href={loginUrl} className="btn">
          Login no Spotify
        </a>
      </div>
      <Footer />
    </>
  );
};

export default Landing;

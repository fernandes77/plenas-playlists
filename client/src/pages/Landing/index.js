import React from 'react';
import './styles.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Landing = () => {
  return (
    <>
      <Header />
      <div className="landing">
        <h1>Viva com a música.</h1>
        <p>
          Crie playlists no Spotify com a sua personalidade de maneira simples e
          rápida
        </p>
        <a href="/login" className="btn">
          Login no Spotify
        </a>
      </div>
      <Footer />
    </>
  );
};

export default Landing;

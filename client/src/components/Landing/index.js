import React from 'react';
import './styles.css';

const Landing = () => {
  return (
    <div className="landing">
      <div>
        <h2>Viva com a música.</h2>
        <p>
          Crie playlists no Spotify com a sua personalidade de maneira simples e
          rápida
        </p>
      </div>
      <a className="btn" href="http://localhost:8888">
        FAÇA LOGIN NO SPOTIFY
      </a>
    </div>
  );
};

export default Landing;

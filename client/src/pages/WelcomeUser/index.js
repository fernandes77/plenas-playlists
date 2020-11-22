import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import spotifyApi from '../../services/spotifyApi';

const WelcomeUser = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [userFollowers, setUserFollowers] = useState(0);
  const [userProduct, setUserProduct] = useState(0);
  const [userUrl, setUserUrl] = useState('');

  useEffect(() => {
    spotifyApi.getMe().then((res) => {
      console.log(res);
      setUserName(res.display_name);
      setUserEmail(res.email);
      setUserCountry(res.country);
      setUserFollowers(res.followers.total);
      setUserProduct(res.product);
      setUserUrl(res.external_urls.spotify);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="welcome-user">
        <h1>Olá, {userName.split(' ')[0]}</h1>
        <div className="profile">
          <ul>
            <li id="name">{userName}</li>
            <li id="country">{userCountry}</li>
            <li id="email">{userEmail}</li>
            <li id="followers">{userFollowers} seguidores</li>
            <li id="product">Assinatura {userProduct}</li>
          </ul>
          <a target="_blank" href={userUrl} className="btn">
            Ver perfil &#8599;
          </a>
          <Link
            onClick={() => sessionStorage.clear()}
            to="/"
            className="btn btn-leave"
          >
            Sair
          </Link>
        </div>
        <div className="buttons">
          <Link to="/create-playlist" className="btn btn-welcome">
            Criar playlist
          </Link>
          <Link to="/your-playlists" className="btn btn-welcome">
            Editar playlist
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WelcomeUser;

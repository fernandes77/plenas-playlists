import React, { useState, useEffect } from 'react';
import './styles.css';

import Landing from '../Landing';
import WelcomeUser from '../WelcomeUser';

import spotifyApi from '../../services/spotifyApi';

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };
  const params = getHashParams();

  useEffect(() => {
    setLoggedIn(params.access_token ? true : false);
    spotifyApi.setAccessToken(params.access_token);
  }, []);

  return (
    loggedIn ? (<WelcomeUser />) : (<Landing />)
  );
};

export default Home;

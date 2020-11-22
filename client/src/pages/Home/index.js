import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './styles.css';

import Landing from '../Landing';

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

  const setAccessToken = () => {
    const params = getHashParams();
    setLoggedIn(params.access_token ? true : false);
    sessionStorage.setItem('access_token', params.access_token);
    spotifyApi.setAccessToken(params.access_token);
  }

  useEffect(() => {
    setAccessToken();
  }, []);

  return loggedIn ? <Redirect to="/user" /> : <Landing />;
};

export default Home;

import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Landing from './components/Landing';
import CreatePlaylist from './components/CreatePlaylist';
import AddTracks from './components/AddTracks';
import './App.css';

import Spotify from 'spotify-web-api-js';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const spotifyWebApi = new Spotify();

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
    spotifyWebApi.setAccessToken(params.access_token);
  });
  return (
    <div className="container">
      <div className="wrapper">
        <Header />
        {loggedIn ? (
          <>
            <CreatePlaylist />
          </>
        ) : (
          <>
            <Landing />
          </>
        )}
      </div>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import './styles.css';

import Spotify from 'spotify-web-api-js';

const CreatePlaylist = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');

  const spotifyWebApi = new Spotify();

  spotifyWebApi.getMe().then((res) => {
    console.log(res);
    setUserName(res.display_name);
    setUserId(res.id);
  });
  console.log(userName);

  const handleNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setPlaylistDescription(e.target.value);
  };

  const handlePlaylistSubmit = () => {
    spotifyWebApi
      .createPlaylist(userId, {
        name: playlistName,
        description: playlistDescription,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className="create-playlist">
      <h2>Olá, {userName}</h2>
      <div>
        <h3>Nomeie a sua playlist...</h3>
        <input
          className="playlist-name"
          type="text"
          onChange={(e) => handleNameChange(e)}
          required
        />
      </div>
      <div>
        <h3>...e dê uma descrição (opcional)</h3>
        <input
          className="playlist-description"
          type="text"
          onChange={(e) => handleDescriptionChange(e)}
        />
      </div>
      <a type="submit" className="btn" onClick={() => handlePlaylistSubmit()}>
        CRIAR PLAYLIST
      </a>
    </div>
  );
};

export default CreatePlaylist;

import React, { useState } from 'react';
import './styles.css';

import AddTracks from '../AddTracks';

import Spotify from 'spotify-web-api-js';

const CreatePlaylist = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [playlistId, setPlaylistId] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const spotifyWebApi = new Spotify();

  spotifyWebApi.getMe().then((res) => {
    setUserName(res.display_name);
    setUserId(res.id);
  });

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
        setPlaylistId(res.id);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setError('Ops, ocorreu um erro.');
      });
  };

  return success ? (
    <AddTracks playlistId={playlistId} />
  ) : (
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
      <small>{error}</small>
    </div>
  );
};

export default CreatePlaylist;
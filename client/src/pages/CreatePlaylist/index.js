import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './styles.css';

import Header from '../../components/Header';
import Input from '../../components/Input';

import spotifyApi from '../../services/spotifyApi';

const CreatePlaylist = (props) => {
  const [userId, setUserId] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [playlistUri, setPlaylistUri] = useState('');

  spotifyApi.getMe().then((res) => {
    setUserId(res.id);
  });

  const handleNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setPlaylistDescription(e.target.value);
  };

  const handlePlaylistSubmit = () => {
    spotifyApi
      .createPlaylist(userId, {
        name: playlistName,
        description: playlistDescription,
      })
      .then((res) => {
        console.log(res);
        setPlaylistUri(`/edit-playlist/${res.id}`);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setError('Ops, ocorreu um erro.');
      });
  };

  return (
    <>
      <Header />
      <div className="create-playlist">
        <button className="btn btn-back" onClick={() => props.history.goBack()}>
          &larr; Voltar
        </button>
        <Input
          label="Nomeie sua playlist..."
          name="name"
          onChange={(e) => handleNameChange(e)}
        />
        <Input
          label="...e dê uma descrição (opcional)"
          name="name"
          onChange={(e) => handleDescriptionChange(e)}
        />
        <button className="btn create" onClick={() => handlePlaylistSubmit()}>
          Criar
        </button>
        {success ? <Redirect to={playlistUri} /> : <small>{error}</small>}
      </div>
    </>
  );
};

export default CreatePlaylist;

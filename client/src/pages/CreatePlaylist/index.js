import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './styles.css';

import Header from '../../components/Header';
import Input from '../../components/Input';

import spotifyApi from '../../services/spotifyApi';

const CreatePlaylist = () => {
  const [userId, setUserId] = useState('');
  const [playlistId, setPlaylistId] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    spotifyApi.getMe().then((res) => {
      setUserId(res.id);
    });
  }, []);

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
        sessionStorage.setItem('playlistId', res.id);
        setPlaylistId(res.id);
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
        <Link className="btn btn-back" to="/user">
          &larr; Voltar
        </Link>
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
        {success ? (
          <Redirect to={`/search-tracks/${playlistId}`} />
        ) : (
          <small>{error}</small>
        )}
      </div>
    </>
  );
};

export default CreatePlaylist;

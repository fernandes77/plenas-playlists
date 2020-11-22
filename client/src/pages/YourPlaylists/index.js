import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import emptyIcon from '../../assets/icons/empty.png';

import Header from '../../components/Header';

import spotifyApi from '../../services/spotifyApi';

const YourPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    spotifyApi.getMe().then((res) => {
      const userId = res.id;
      spotifyApi.getUserPlaylists({ limit: 50 }).then((res) => {
        console.log(res);
        let editablePlaylists = [];
        for (let i = 0; i < res.items.length; i++) {
          if (res.items[i].owner.id === userId)
            editablePlaylists.push(res.items[i]);
        }
        setPlaylists(editablePlaylists);
      });
    });
  }, []);

  return (
    <>
      <Header />
      <div className="your-playlists">
        <Link className="btn btn-back" to="/user">
          &larr; Voltar
        </Link>
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              {playlist.images.length !== 0 ? (
                <img src={playlist.images[0].url} alt="empty" />
              ) : (
                <img src={emptyIcon} alt="empty" />
              )}
              <div className="playlist-text">
                <h3>{playlist.name}</h3>
                <p>
                  <small>de {playlist.owner.display_name}</small>
                </p>
              </div>
              <Link
                onClick={() =>
                  sessionStorage.setItem('playlistId', playlist.id)
                }
                to={`/search-tracks/${playlist.id}`}
                className="btn"
              >
                &rarr;
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default YourPlaylists;

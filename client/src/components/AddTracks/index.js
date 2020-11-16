import React, { useState } from 'react';
import './styles.css';

import Spotify from 'spotify-web-api-js';

const AddTracks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const spotifyWebApi = new Spotify();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    spotifyWebApi.searchTracks(searchQuery).then((res) => {
      setSearchResults(res.tracks.items);
      console.log(res.tracks.items);
    });
  };

  const handleTrackSubmit = () => {};

  return (
    <div className="add-tracks">
      <h2>Playlist criada!</h2>
      <h3>Agora vamos adicionar músicas</h3>
      <input type="text" name="songs" onChange={(e) => handleSearchChange(e)} />
      <a className="btn" onClick={() => handleSearchSubmit()}>
        PROCURAR
      </a>
      <ul>
        {searchResults.map((result) => (
          <>
            <li key={result.id}>
              {result.name}
              <small>{result.artists.map((artist) => artist.name)}</small>
            </li>
            <button key={result.id} onClick={(e) => handleTrackSubmit(e)}>
              Adicionar
            </button>
          </>
        ))}
      </ul>
    </div>
  );
};

export default AddTracks;

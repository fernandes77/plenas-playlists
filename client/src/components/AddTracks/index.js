import React, { useState } from 'react';
import './styles.css';
import { removeValueFromArray } from '../../utils/removeFromArray';

import Spotify from 'spotify-web-api-js';

const AddTracks = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [addedTracks, setAddedTracks] = useState([]);

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

  const handleTrackAdditionOrRemoval = (trackUri) => {
    let newTrackList = addedTracks;
    if (!addedTracks.includes(trackUri)) {

      newTrackList.push(trackUri);
      setAddedTracks(newTrackList);

      spotifyWebApi.addTracksToPlaylist(props.playlistId, [trackUri]);
    } else {

      newTrackList = removeValueFromArray(newTrackList, trackUri);
      setAddedTracks(newTrackList);

      spotifyWebApi.removeTracksFromPlaylist(props.playlistId, [trackUri]);
    }
    console.log(addedTracks);
  };

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
          <li key={result.id}>
            {result.name}
            <small>{result.artists.map((artist) => artist.name)}</small>
            <button onClick={() => handleTrackAdditionOrRemoval(result.uri)}>
              Adicionar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddTracks;

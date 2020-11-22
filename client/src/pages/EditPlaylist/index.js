import React, { useEffect, useState, useReducer } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import seePlaylist from '../../assets/icons/see-playlist.svg';
import { removeValueFromArray } from '../../utils/utils';

import Header from '../../components/Header';
import Input from '../../components/Input';

import spotifyApi from '../../services/spotifyApi';

const EditPlaylist = (props) => {
  const [playlistId, setPlaylistId] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [tracks, setTracks] = useState([]);

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const id = sessionStorage.getItem('playlistId');
    setPlaylistId(id);
    console.log(playlistId);
    spotifyApi.getPlaylist(id).then((res) => {
      console.log(res);
      setPlaylistName(res.name);
      setTracks(res.tracks.items.map((trackObject) => trackObject.track.uri));
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    spotifyApi.searchTracks(searchQuery).then((res) => {
      setSearchResults(res.tracks.items);
      console.log(res.tracks.items);
    });
  };

  const handleTrackAdditionOrRemoval = (trackUri) => {
    let newTrackList = tracks;
    if (!tracks.includes(trackUri)) {
      newTrackList.push(trackUri);
      setTracks(newTrackList);
      spotifyApi.addTracksToPlaylist(playlistId, [trackUri]);
    } else {
      newTrackList = removeValueFromArray(newTrackList, trackUri);
      setTracks(newTrackList);
      spotifyApi.removeTracksFromPlaylist(playlistId, [trackUri]);
    }
    console.log(tracks);
    forceUpdate();
  };

  return (
    <>
      <Header />
      <div className="edit-playlist">
        <button onClick={() => props.history.goBack()} className="btn btn-back">
          &larr; Voltar
        </button>
        <h1>{playlistName}</h1>
        <form onSubmit={(e) => handleSearchSubmit(e)}>
          <Input
            label="Procurar músicas"
            name="song-search"
            onChange={(e) => handleSearchChange(e)}
          />
        </form>
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              <img src={result.album.images[0].url} alt="" />
              <div className="track-text">
                <h3>
                  {result.name.slice(0, 23)}
                  {result.name.length <= 23 ? '' : '...'}
                </h3>
                <span>
                  {result.artists.map((artist) =>
                    artist === result.artists[0]
                      ? artist.name
                      : `, ${artist.name}`
                  )}
                </span>
              </div>
              <button
                className={
                  tracks.includes(result.uri) ? 'remove-track' : 'add-track'
                }
                onClick={() => handleTrackAdditionOrRemoval(result.uri)}
              >
                {tracks.includes(result.uri) ? '-' : '+'}
              </button>
            </li>
          ))}
        </ul>
        <Link to={`/view-playlist/${playlistId}`}>
          <img className="open-playlist" src={seePlaylist} />
        </Link>
      </div>
    </>
  );
};

export default EditPlaylist;

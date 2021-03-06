import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import emptyIcon from '../../assets/icons/empty.png';
import seePlaylist from '../../assets/icons/close-playlist.svg';

import spotifyApi from '../../services/spotifyApi';

const ViewPlaylist = (props) => {
  const [playlistId, setPlaylistId] = useState('');
  const [playlistImage, setPlaylistImage] = useState(emptyIcon);
  const [playlistOwner, setPlaylistOwner] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [tracks, setTracks] = useState([]);

  const handleTrackRemoval = (trackUri) => {
    spotifyApi.removeTracksFromPlaylist(playlistId, [trackUri]).then((res) => {
      console.log(res);

      const updatedTracks = tracks.filter(
        (trackObject) => trackObject.track.uri !== trackUri
      );
      setTracks(updatedTracks);
      console.log(tracks);
    });
  };

  const getPlaylist = () => {
    const id = sessionStorage.getItem('playlistId');
    setPlaylistId(id);
    spotifyApi.getPlaylist(id).then((res) => {
      setPlaylistName(res.name);
      if (res.images.length > 0) setPlaylistImage(res.images[0].url);
      setPlaylistOwner(res.owner.display_name);
      setPlaylistDescription(res.description);
      setTracks(res.tracks.items);
    });
  }

  useEffect(() => {
    getPlaylist();
  }, []);

  return (
    <div className="view-playlist">
      <img className="cover" src={playlistImage} alt="cover" />
      <h1>{playlistName}</h1>
      <h2>{playlistDescription}</h2>
      <h3>Feito por {playlistOwner}</h3>
      <ul>
        {tracks.map((trackObject) => (
          <li key={trackObject.track.id}>
            <img
              src={trackObject.track.album.images[0].url}
              alt=""
              onClick={() =>
                window.open(trackObject.track.external_urls.spotify)
              }
            />
            <div className="track-text">
              <h3>
                {trackObject.track.name.slice(0, 23)}
                {trackObject.track.name.length <= 23 ? '' : '...'}
              </h3>
              <span>
                {trackObject.track.artists.map((artist) =>
                  artist === trackObject.track.artists[0]
                    ? artist.name
                    : `, ${artist.name}`
                )}
              </span>
            </div>
            <button
              className="remove-track"
              onClick={() => handleTrackRemoval(trackObject.track.uri)}
            >
              &#10006;
            </button>
          </li>
        ))}
      </ul>
      <Link to={`/search-tracks/${playlistId}`}>
        <img className="close-playlist" src={seePlaylist} />
      </Link>
    </div>
  );
};

export default ViewPlaylist;

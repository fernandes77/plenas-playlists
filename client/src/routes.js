import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import WelcomeUser from './pages/WelcomeUser';
import CreatePlaylist from './pages/CreatePlaylist';
import YourPlaylists from './pages/YourPlaylists';
import SearchTracks from './pages/SearchTracks';
import ViewPlaylist from './pages/ViewPlaylist';

const Routes = () => (
  <Router>
    <Route exact path="/" component={Home} />
    <Route path="/user" component={WelcomeUser} />
    <Route path="/create-playlist" component={CreatePlaylist} />
    <Route path="/your-playlists/" component={YourPlaylists} />
    <Route path="/search-tracks/:playlistId" component={SearchTracks} />
    <Route path="/view-playlist/:playlistId" component={ViewPlaylist} />
  </Router>
);

export default Routes;

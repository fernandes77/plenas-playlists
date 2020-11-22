import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import CreatePlaylist from './pages/CreatePlaylist';
import YourPlaylists from './pages/YourPlaylists';
import EditPlaylist from './pages/EditPlaylist';
import ViewPlaylist from './pages/ViewPlaylist';

const Routes = () => (
  <Router>
    <Route exact path="/" component={Home} />
    <Route path="/create-playlist" component={CreatePlaylist} />
    <Route path="/your-playlists/" component={YourPlaylists} />
    <Route path="/edit-playlist/:playlistId" component={EditPlaylist} />
    <Route path="/view-playlist/:playlistId" component={ViewPlaylist} />
  </Router>
);

export default Routes;

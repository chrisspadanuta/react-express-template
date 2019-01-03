import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './routes/home';
import Admin from './routes/admin';
import Poll from './routes/poll';
import Results from './routes/results';
import buildPageWithStatus from './components/status-page-template';

import './styles.css';

function App() {
  const AdminPageWithStatus = buildPageWithStatus(Admin, 'Poll Administration');
  const PollPageWithStatus = buildPageWithStatus(Poll, 'Please answer some questions');

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={AdminPageWithStatus} />
        <Route exact path="/poll" component={PollPageWithStatus} />
        <Route exact path="/results" component={Results} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
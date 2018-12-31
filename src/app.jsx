import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './routes/home';
import Admin from './routes/admin';
import Poll from './routes/poll';
import Results from './routes/results';

import styles from './styles.css';

// function App() {
//   return (
//     <h1>Hello Again React!</h1>
//   );
// }

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/poll" component={Poll} />
        <Route exact path="/results" component={Results} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
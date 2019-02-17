import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './routes/home';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

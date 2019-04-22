import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import * as serviceWorker from './serviceWorker';

import Home from './components/Home';
import Login from './components/Login';
import Game from './components/Game';

const route = (
  <Router>
    <div>
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.LOGIN} component={Login} />
      <Route path={ROUTES.GAME} component={Game} />
    </div>
  </Router>
)

ReactDOM.render(route, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

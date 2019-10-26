import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import User from './components/User';
import Home from './components/home/Home.js';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={"/user"} exact>
           <User />
          </Route>
          <Route>
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;

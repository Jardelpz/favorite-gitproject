import React from 'react';
import Logged from './components/Logged'
import Login from './components/Login'
import Inicio from './components/inicio'
import { isAuthenticated } from './components/authenticate'

import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <Link to="/loggin">Logar</Link>
            </li>
            <li>
              <Link to="/logged">Entrar no sistema</Link>
            </li>
          </ul>

          <Switch>
            <Route exact path="/">
              <Inicio />
            </Route>
            <Route exact path="/loggin">
              < Login />
            </Route>
            <PrivateRoute exact path="/logged" Component={ Logged } />

          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}


function PrivateRoute({ comp: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={ props  =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
      }
    />
  );
}
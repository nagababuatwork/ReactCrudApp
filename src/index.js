// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import * as serviceWorker from './serviceWorker';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import UserActionApp from './UserCRUD/UserAction';
// import 'react-toastify/dist/ReactToastify.css';

// ReactDOM.render(<UserActionApp />, document.getElementById('root'));

// serviceWorker.unregister();

import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import './style.css';

import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import Login from './Login';
import Dashboard from './Dashboard';
import UserActionApp from './UserCRUD/UserAction';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Common';

function App(props) {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
        removeUserSession();
        setAuthLoading(false);
    }
    else{
        setAuthLoading(false);
    }
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

   // handle click event of logout button
   const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">      
            {!getToken() && <NavLink activeClassName="active" to="/login">Login</NavLink>}
            {getToken() && <NavLink activeClassName="active" to="/dashboard">Home</NavLink>}
            {getToken() && <NavLink activeClassName="active" to="/UserActionApp">Users</NavLink>}
            {/* {getToken() && <input type="button" onClick={handleLogout} value="Logout" />} */}
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/UserActionApp" component={UserActionApp} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

render(<App />, document.getElementById('root'));

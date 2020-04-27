import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Register from './components/authentication/Register.js';
import Login from './components/authentication/Login.js';
import PrivateRoute from './utils/PrivateRoute.js';
import Dashboard from './components/Dashboard.js';
import UserDashboard from './components/UserDashboard.js';
import AddPostForm from './components/AddPostForm.js';
import UserForm from './components/UserForm.js';
import IssueCard from './components/issues/IssueCard.js';

function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/post/:id" component={IssueCard} />
        <PrivateRoute path="/user/posts" component={UserDashboard} />
        <PrivateRoute path="/addpost" component={AddPostForm} />
        <PrivateRoute path="/profile_form" component={UserForm} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';

import WelcomePage from './components/authentication/WelcomePage.js';
import Register from './components/authentication/Register.js';
import Login from './components/authentication/Login.js';
import PrivateRoute from './utils/PrivateRoute.js';
import Dashboard from './components/dashboard/Dashboard.js';
import Profile from './components/profile/Profile.js';
import AddPostForm from './components/add-post-form/AddPostForm.js';
import UserForm from './components/profile/UserForm.js';
import IssueCard from './components/issues/IssueCard.js';
import AboutPage from './components/authentication/AboutPage.js';

function App() {
    return (
        <div className="App">
            <Switch>
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/post/:id" component={IssueCard} />
                <PrivateRoute path="/user/posts" component={Profile} />
                <PrivateRoute path="/addpost" component={AddPostForm} />
                <PrivateRoute path="/profile_form" component={UserForm} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/about" component={AboutPage} />
                <Route exact path="/" component={WelcomePage} />
            </Switch>
        </div>
    );
}

export default App;

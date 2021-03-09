import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';

import WelcomePage from './components/authentication/welcome-page/WelcomePage.js';
import Register from './components/authentication/register/Register.js';
import Login from './components/authentication/login/Login.js';
import PrivateRoute from './components/other/protected-route/PrivateRoute.js';
import Dashboard from './components/dashboard/Dashboard.js';
import Profile from './components/profile/Profile.js';
import AddPostForm from './components/add-post-form/AddPostForm.js';
import ProfileForm from './components/profile/update-profile-form/ProfileForm.js';
import IssueCard from './components/issues/IssueCard.js';
import AboutPage from './components/authentication/about-page/AboutPage.js';

function App() {
    return (
        <div className="App">
            <Switch>
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/post/:id" component={IssueCard} />
                <PrivateRoute path="/user/posts" component={Profile} />
                <PrivateRoute path="/addpost" component={AddPostForm} />
                <PrivateRoute path="/profile_form" component={ProfileForm} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/about" component={AboutPage} />
                <Route exact path="/" component={WelcomePage} />
            </Switch>
        </div>
    );
}

export default App;

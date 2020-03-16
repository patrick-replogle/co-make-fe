import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Register from "./components/authentication/Register.js";
import Login from "./components/authentication/Login.js";
import PrivateRoute from "./components/PrivateRoute.js";
import Dashboard from "./components/Dashboard.js";
import UserDashboard from "./components/UserDashboard.js";
import AddPostForm from "./components/AddPostForm.js";
import { postContext } from "./contexts/postContext.js";

function App() {
  const [posts, setPosts] = useState([]);
  const [postToEdit, setPostToEdit] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="App">
      <postContext.Provider
        value={{
          posts,
          setPosts,
          postToEdit,
          setPostToEdit,
          isEditing,
          setIsEditing
        }}
      >
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/user/posts" component={UserDashboard} />
          <PrivateRoute exact path="/addpost" component={AddPostForm} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </postContext.Provider>
    </div>
  );
}

export default App;

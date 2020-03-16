import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Register from "./components/authentication/Register.js";
import Login from "./components/authentication/Login.js";
import PrivateRoute from "./components/PrivateRoute.js";
import Dashboard from "./components/Dashboard.js";
import UserDashboard from "./components/UserDashboard.js";
import AddPostForm from "./components/AddPostForm.js";
import { userContext } from "./contexts/userContext.js";
import { postContext } from "./contexts/postContext.js";

function App() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [postToEdit, setPostToEdit] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="App">
      <userContext.Provider value={{ user, setUser }}>
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
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/user/posts" component={UserDashboard} />
            <PrivateRoute path="/addpost" component={AddPostForm} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </postContext.Provider>
      </userContext.Provider>
    </div>
  );
}

export default App;

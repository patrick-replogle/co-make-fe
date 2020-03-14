import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Register from "./components/authentication/Register.js";
import Login from "./components/authentication/Login.js";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;

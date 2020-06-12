import React from "react";
import { Link, withRouter } from "react-router-dom";

const AuthHeader = ({ history }) => {
  return (
    <nav className="authHeader">
      <h1>CoMake</h1>
      <div className="authHeaderLinks">
        <button onClick={() => history.push("/register")}>Register</button>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default withRouter(AuthHeader);

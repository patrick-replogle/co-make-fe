import React from "react";
import { Link, useHistory } from "react-router-dom";

const AuthHeader = ({ history }) => {
  const { push } = useHistory();

  return (
    <nav className="authHeader">
      <h1>CoMake</h1>
      <div className="authHeaderLinks">
        <button onClick={() => push("/register")}>Register</button>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default AuthHeader;

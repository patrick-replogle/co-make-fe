import React from "react";
import { Link } from "react-router-dom";

const AuthHeader = () => {
    return (
        <nav className="authHeader">
            <h1>CoMake</h1>
            <div>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
};

export default AuthHeader;
import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

const AuthHeader = () => {
    const { push } = useHistory();
    const { pathname } = useLocation();

    return (
        <nav className="authHeader">
            <h1>CoMake</h1>
            <div className="authHeaderLinks">
                {pathname === '/register' && (
                    <>
                        <Link to="/about">About</Link>
                        <button onClick={() => push('/login')}>Login</button>
                    </>
                )}

                {pathname === '/about' && (
                    <>
                        <Link to="/about">About</Link>
                        <Link to="/register">Register</Link>
                        <button onClick={() => push('/login')}>Login</button>
                    </>
                )}

                {pathname === '/login' && (
                    <>
                        <Link to="/about">About</Link>
                        <button onClick={() => push('/register')}>
                            Register
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default AuthHeader;

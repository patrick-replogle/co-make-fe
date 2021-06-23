import React from 'react';

import './welcomePage.styles.scss';

const WelcomePage = ({ history }) => {
    return (
        <div className="welcomePageMain">
            <div className="welcomePageContainer">
                <h1>CoMake</h1>
                <h3>Get involved in your community</h3>
                <button
                    className="welcomePageBtn"
                    onClick={() => history.push('/register')}
                >
                    Register
                </button>
                <p>Already Have an Account?</p>
                <button
                    className="welcomePageBtn2"
                    onClick={() => history.push('/login')}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default WelcomePage;

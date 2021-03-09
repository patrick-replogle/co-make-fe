import React from 'react';
import Planting from '../../img/planting.jpg';

import AuthHeader from './AuthHeader.js';
import Footer from '../other/Footer.js';

const AboutPage = () => {
    return (
        <>
            <AuthHeader />
            <div className="aboutPageContainer">
                <div>
                    <img src={Planting} alt="about avatar" />
                    <div className="aboutPageText">
                        <h3>What is CoMake?</h3>
                        <p>
                            CoMake is a social media app that provides users
                            with a platform to get involved in their local
                            community. Want to call attention to an issue in
                            your neighborhood? Maybe you would like to volunteer
                            your time or money towards a cause you are
                            passionate about? Want to help make positive change?
                            CoMake is here to help you get your concerns
                            addressed.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutPage;

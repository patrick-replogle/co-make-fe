import React from "react";
import Planting from "../../img/planting.jpg";

import AuthHeader from "./AuthHeader.js";

const AboutPage = () => {
  return (
    <>
      <AuthHeader />
      <div className="aboutPageContainer">
        <div>
          <img src={Planting} alt="about avatar" />
          <div className="aboutPageText">
            <h3>What is coMake?</h3>
            <p>
              coMake is a social media app that provides local community members
              with a platform to get involved in their local community. Want to
              call attention to an issue in your neighborhood? Would you like to
              volunteer your time or money towards a cause you are passionate
              about? Want to help make positive change? coMake is here to help
              you get your concerns addressed.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;

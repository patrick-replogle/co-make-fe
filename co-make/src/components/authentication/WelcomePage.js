import React from "react";

const WelcomePage = (props) => {
  return (
    <div className="welcomePageMain">
      <div className="welcomePageContainer">
        <h1>CoMake</h1>
        <h3>Get involved in your community</h3>
        <button
          className="welcomePageBtn"
          onClick={() => props.history.push("/register")}
        >
          Register
        </button>
        <p>Already Have an Account?</p>
        <button
          className="welcomePageBtn2"
          onClick={() => props.history.push("/login")}
        >
          Login
        </button>
        {/* <p
          style={{
            width: "380px",
            fontWeight: "bold",
            textAlign: "left",
            margin: "30px 0",
          }}
        >
          Want to call attention to an issue in your local community? You've
          come to the right place. Voice your concerns. Reach out for help.
          Offer to volunteer. Be part of the solution.
        </p> */}
      </div>
    </div>
  );
};

export default WelcomePage;

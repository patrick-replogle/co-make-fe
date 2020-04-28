import React from "react";

const WelcomePage = (props) => {
    return (
        <div className="welcomePageMain">
            <div className="welcomePageContainer">
                <h1>Co-Make</h1>
                <h3>Solve local problems</h3>
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
            </div>
        </div>
    )
}

export default WelcomePage;
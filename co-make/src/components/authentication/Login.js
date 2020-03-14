import React, { useState } from "react";

import { axiosWithAuth } from "../../utils/axiosWithAuth.js";

const initialLoginState = {
  username: "",
  password: ""
};

const Login = props => {
  const [signInData, setSignInData] = useState(initialLoginState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => {
    e.preventDefault();
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    axiosWithAuth()
      .post("/auth/login", signInData)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("message", res.data.message);
        setIsLoading(false);
        setSignInData(initialLoginState);
        console.log(res.data);
        //props.history.push("/dashboard");
      })
      .catch(err => {
        setIsLoading(false);
        console.log("error loggin in: ", err);
        setError(err.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="username"
          value={signInData.username}
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="password"
          value={signInData.password}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";

import { axiosWithAuth } from "../../utils/axiosWithAuth.js";

const initialUser = {
  username: "",
  password: "",
  email: "",
  first_name: "",
  last_name: ""
};

const Register = props => {
  const [registerData, setRegisterData] = useState(initialUser);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setisLoading(true);
    setError("");
    axiosWithAuth()
      .post("/auth/register", registerData)
      .then(res => {
        setisLoading(false);
        setRegisterData(initialUser);
        props.history.push("/login");
      })
      .catch(err => {
        setisLoading(false);
        console.log(err);
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
          value={registerData.username}
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="password"
          value={registerData.password}
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="email"
          value={registerData.email}
        />
        <input
          type="text"
          name="first_name"
          onChange={handleChange}
          placeholder="first_name"
          value={registerData.first_name}
        />
        <input
          type="text"
          name="last_name"
          onChange={handleChange}
          placeholder="last_name"
          value={registerData.last_name}
        />
        <button>Submit</button>
        <button onClick={() => setRegisterData(initialUser)}>Reset</button>
      </form>
    </div>
  );
};

export default Register;

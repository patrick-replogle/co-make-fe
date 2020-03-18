import React, { useState, useEffect, useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { axiosWithAuth } from "../utils/axiosWithAuth.js";
import { userContext } from "../contexts/userContext.js";

const initialUserState = {
  username: "",
  password: "",
  email: "",
  first_name: "",
  last_name: "",
  profile_image_url: ""
};

const UserForm = props => {
  const { user, setUser } = useContext(userContext);
  const [formData, setFormData] = useState(initialUserState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get(`/users/${localStorage.getItem("userId")}`)
      .then(res => {
        setIsLoading(false);
        setUser(res.data);
      })
      .catch(err => {
        setIsLoading(false);
        console.log("error updating: ", err.response.data.message);
      });
  }, [setUser]);

  useEffect(() => {
    setFormData({
      username: user.username,
      password: "",
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_image_url: user.profile_image_url
    });
  }, [user, setFormData]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    setIsSubmitting(true);
    e.preventDefault();
    axiosWithAuth()
      .put(`/users/${user.id}`, formData)
      .then(res => {
        setIsSubmitting(false);
        setUser(res.data);
        props.history.push("/user/posts");
      })
      .catch(err => {
        setIsSubmitting(false);
        setErrMessage(err.response.data.message);
        console.log("user form error: ", err.response.data.message);
      });
  };

  if (isLoading) {
    return (
      <div className="loading">
        <CircularProgress color="primary" size="100px" />
      </div>
    );
  } else {
    return (
      <div className="profileForm">
        {errMessage && <p>{errMessage}</p>}
        <h1>Update Profile</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
            placeholder="username"
            required
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="password"
            required
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="email"
            required
          />
          <input
            type="text"
            name="first_name"
            onChange={handleChange}
            value={formData.first_name}
            placeholder="first name"
            required
          />
          <input
            type="text"
            name="last_name"
            onChange={handleChange}
            value={formData.last_name}
            placeholder="last name"
            required
          />

          <input
            type="text"
            name="profile_image_url"
            onChange={handleChange}
            value={formData.profile_image_url}
            placeholder="profile image url"
          />
          {isSubmitting ? (
            <button>
              <CircularProgress color="primary" size="20px" />
            </button>
          ) : (
            <button>Submit</button>
          )}
          <button
            onClick={() => {
              setFormData({});
              props.history.push("/user/posts");
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
};

export default UserForm;

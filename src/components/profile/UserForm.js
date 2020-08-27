import React, { useState, useEffect, useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { axiosWithAuth } from "../../utils/axiosWithAuth.js";
import { userContext } from "../../contexts/userContext.js";
import { updatedUser } from "../../utils/functions";
import ProtectedHeader from "../other/ProtectedHeader.js";
import ImageUpload from "../other/ImageUpload.js";
import Footer from "../other/Footer.js";

const initialUserState = {
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  city: "",
  zip_code: "",
};

const UserForm = (props) => {
  const { user, setUser } = useContext(userContext);
  const [formData, setFormData] = useState(initialUserState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get(`/users/${localStorage.getItem("userId")}`)
      .then((res) => {
        setIsLoading(false);
        setUser(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("error updating: ", err.response.data.message);
      });
  }, [setUser]);

  useEffect(() => {
    setFormData({
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      city: user.city,
      zip_code: user.zip_code,
    });

    if (user.photo !== "null") {
      setPhoto(user.photo);
    }
  }, [user, setFormData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    e.preventDefault();

    const updatedValues = updatedUser(user, formData);
    const values = {
      ...updatedValues,
      photo: photo ? photo : null,
    };

    axiosWithAuth()
      .put(`/users/${user.id}`, values)
      .then((res) => {
        setIsSubmitting(false);
        setUser(res.data);
        props.history.push("/user/posts");
      })
      .catch((err) => {
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
      <div>
        <ProtectedHeader />
        <div className="profileForm">
          <h1 style={{ color: "#e01f3d" }}>Update Profile</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={formData.username}
              id="username"
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              id="email"
              required
            />

            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              onChange={handleChange}
              value={formData.first_name}
              id="first_name"
              required
            />

            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              name="last_name"
              onChange={handleChange}
              value={formData.last_name}
              id="last_name"
              required
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              onChange={handleChange}
              value={formData.city}
              id="city"
              required
            />

            <label htmlFor="zip_code">Zip Code</label>
            <input
              type="text"
              name="zip_code"
              onChange={handleChange}
              value={formData.zip_code}
              id="zip_code"
              required
            />

            <ImageUpload photo={photo} setPhoto={setPhoto} />

            {errMessage && (
              <p style={{ color: "crimson", maxWidth: "380px" }}>
                {errMessage}
              </p>
            )}
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
        <Footer />
      </div>
    );
  }
};

export default UserForm;

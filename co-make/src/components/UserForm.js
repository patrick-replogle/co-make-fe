import React, { useState, useEffect } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth.js";

const UserForm = props => {
  const [formData, setFormData] = useState({});
  useEffect(() => {
    axiosWithAuth()
      .get(`/users/${localStorage.getItem("userId")}`)
      .then(res => {
        const user = res.data;
        setFormData({
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          profile_image_url: user.profile_image_url
        });
      })
      .catch(err => {
        console.log("error fetching user: ", err.response.data.message);
      });
  }, [setFormData]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          placeholder="username"
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
          required
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default UserForm;

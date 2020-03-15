import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialFormState = {
  title: "",
  description: "",
  city: "",
  zip_code: "",
  post_image_url: ""
};

const AddPostForm = props => {
  const [postData, setPostData] = useState(initialFormState);

  const handleChange = e => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/posts", postData)
      .then(res => {
        console.log(res);
        setPostData(initialFormState);
        props.history.push("/user/posts");
      })
      .catch(err => {
        console.log("Error posting: ", err.response.data.message);
      });
  };
  return (
    <div className="addFormContainer">
      <h1>Add a Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={postData.title}
          placeholder="title"
          required
        />
        <input
          type="textarea"
          name="description"
          onChange={handleChange}
          value={postData.description}
          placeholder="description"
          required
        />
        <input
          type="text"
          name="city"
          onChange={handleChange}
          value={postData.city}
          placeholder="city"
          required
        />
        <input
          type="text"
          name="zip_code"
          onChange={handleChange}
          value={postData.zip_code}
          placeholder="zip code"
          required
        />
        <input
          type="text"
          name="post_image_url"
          onChange={handleChange}
          value={postData.post_image_url}
          placeholder="image url"
        />
        <button>Submit</button>
        <button onClick={() => setPostData(initialFormState)}>Reset</button>
      </form>
    </div>
  );
};

export default AddPostForm;

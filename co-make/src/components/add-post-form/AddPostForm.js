import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import { axiosWithAuth } from "../../utils/axiosWithAuth.js";
import { postContext } from "../../contexts/postContext.js";
import AddPostHeader from "./AddPostHeader.js";

const initialFormState = {
  title: "",
  description: "",
  city: "",
  zip_code: "",
  post_image_url: "",
};

const AddPostForm = ({ history }) => {
  const [postData, setPostData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { isEditing, setIsEditing, postToEdit, setPostToEdit } = useContext(
    postContext
  );

  useEffect(() => {
    if (isEditing) {
      setPostData({ ...postToEdit });
    }
  }, [isEditing, postToEdit]);

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (isEditing) {
      axiosWithAuth()
        .put(`/posts/${postToEdit.id}`, postData)
        .then(() => {
          setIsEditing(false);
          setPostToEdit({});
          setPostData(initialFormState);
          setIsLoading(false);
          history.push(`/user/posts`);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.response.data.message);
          console.log("Put request error: ", err.response.data.message);
        });
    } else {
      axiosWithAuth()
        .post("/posts", postData)
        .then(() => {
          setIsLoading(false);
          setPostData(initialFormState);
          history.push("/user/posts");
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.response.data.message);
          console.log("Add form post error: ", err.response.data.message);
        });
    }
  };
  return (
    <>
      <AddPostHeader />
      <div className="addFormContainer">
        {isEditing ? (
          <h2 style={{ color: "#e01f3d" }}>Edit a Post</h2>
        ) : (
          <h2 style={{ color: "#e01f3d" }}>Add a Post</h2>
        )}
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={postData.title}
            id="title"
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            type="textarea"
            name="description"
            onChange={handleChange}
            value={postData.description}
            id="description"
            required
          />

          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            value={postData.city}
            id="city"
            required
          />

          <label htmlFor="zip_code">Zip Code</label>
          <input
            type="text"
            name="zip_code"
            onChange={handleChange}
            value={postData.zip_code}
            id="zip code"
            required
          />

          <label htmlFor="post_image_url">Post Image URL</label>
          <input
            type="text"
            name="post_image_url"
            onChange={handleChange}
            value={postData.post_image_url}
            id="image url"
          />

          {isLoading ? (
            <button>
              <CircularProgress color="primary" size="20px" />
            </button>
          ) : (
            <button>Submit</button>
          )}
          <button onClick={() => setPostData(initialFormState)}>Reset</button>
          <button
            onClick={() => {
              setPostData(initialFormState);
              setIsEditing(false);
              setPostToEdit({});
              history.push("/user/posts");
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default withRouter(AddPostForm);

import React, { useState, useEffect, useContext } from "react";

import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { postContext } from "../../contexts/postContext.js";

const AddComment = ({ postId, setComments }) => {
  const [input, setInput] = useState({ text: "" });
  const {
    isEditing,
    setIsEditing,
    commentToEdit,
    setCommentToEdit,
  } = useContext(postContext);

  useEffect(() => {
    if (isEditing) {
      setInput({ text: commentToEdit.text });
    }
  }, [isEditing, setInput, commentToEdit]);

  const handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, text: e.target.value });
  };

  const fetchComments = () => {
    axiosWithAuth()
      .get(`/posts/${postId}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log("error fetching: ", err.response.data.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      axiosWithAuth()
        .put(`/comments/${commentToEdit.id}`, input)
        .then(() => {
          fetchComments();
          setIsEditing(false);
          setCommentToEdit({});
          setInput({ text: "" });
        })
        .catch((err) => {
          console.log("error updating comment: ", err);
        });
    } else {
      axiosWithAuth()
        .post(`/posts/${postId}/comments`, input)
        .then(() => {
          fetchComments();
          setInput({ text: "" });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="commentForm">
      <input
        type="textarea"
        name="text"
        value={input.text}
        onChange={handleChange}
        placeholder="add a comment"
      />
      <button>Submit</button>
    </form>
  );
};

export default AddComment;

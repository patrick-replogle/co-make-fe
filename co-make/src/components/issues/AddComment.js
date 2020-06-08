import React, { useState } from "react";

import { axiosWithAuth } from "../../utils/axiosWithAuth";

const AddComment = ({ id, setComments }) => {
  const [input, setInput] = useState({ text: "" });

  const handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, text: e.target.value });
  };

  const fetchComments = () => {
    axiosWithAuth()
      .get(`/posts/${id}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log("error fetching: ", err.response.data.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/posts/${id}/comments`, input)
      .then(() => {
        fetchComments();
        setInput({ text: "" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit} className="commentForm">
      <input
        type="text"
        name="text"
        value={input.text}
        onChange={handleChange}
        placeholder="add comment"
      />
      <button>submit</button>
    </form>
  );
};

export default AddComment;

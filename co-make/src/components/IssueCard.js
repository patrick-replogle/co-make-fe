import React from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const IssueCard = props => {
  const deletePost = id => {
    axiosWithAuth()
      .delete(`/posts/${id}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("Error deleting post: ", err.response.data.message);
      });
  };
  return (
    <div className="issueCard">
      <img src={props.post.post_image_url} alt="user pic" />
      <h2>Title: {props.post.title}</h2>
      <p>Description: {props.post.description}</p>
      <p>City: {props.post.city}</p>
      <p>Zip-Code: {props.post.zip_code}</p>
      <p>Author: {props.post.author_username}</p>
      <div>
        Votes:
        <button>{props.post.votes}</button>
        <button onClick={() => deletePost(props.post.id)}>Delete</button>
      </div>
    </div>
  );
};

export default IssueCard;

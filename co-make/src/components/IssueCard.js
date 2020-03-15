import React from "react";

const IssueCard = props => {
  return (
    <div>
      <img src={props.post.post_image_url} alt="user pic" />
      <h2>Title: {props.post.title}</h2>
      <p>Description: {props.post.description}</p>
      <p>City: {props.post.city}</p>
      <p>Zip-Code: {props.post.zip_code}</p>
      <p>Author: {props.post.author_username}</p>
      <div>
        Votes:
        <button>{props.post.votes}</button>
      </div>
    </div>
  );
};

export default IssueCard;

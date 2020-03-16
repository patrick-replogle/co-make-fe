import React, { useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { withRouter } from "react-router-dom";
import { postContext } from "../contexts/postContext.js";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const IssueCard = props => {
  const { setIsEditing, setPostToEdit } = useContext(postContext);

  if (props.post.post_image_url === "") {
    props.post.post_image_url =
      "https://pngimage.net/wp-content/uploads/2018/05/default-png-6.png";
  }

  const fetchPosts = () => {
    axiosWithAuth()
      .get("/posts/by/user")
      .then(res => {
        console.log(res.data);
        props.setUserPosts(res.data);
      })
      .catch(err => {
        console.log("error fetching: ", err.response.data.message);
      });
  };

  const handleEdit = post => {
    setPostToEdit(post);
    setIsEditing(true);
    props.history.push("/addpost");
  };

  const deletePost = id => {
    axiosWithAuth()
      .delete(`/posts/${id}`)
      .then(() => {
        fetchPosts();
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
      <p>Author: {props.post.authorUsername}</p>
      <div>
        Votes:
        <button>{props.post.votes}</button>
        <button onClick={() => handleEdit(props.post)}>Edit</button>
        <button onClick={() => deletePost(props.post.id)}>Delete</button>
      </div>
    </div>
  );
};

export default withRouter(IssueCard);

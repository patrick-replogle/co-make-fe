import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { axiosWithAuth } from "../../utils/axiosWithAuth.js";
import { postContext } from "../../contexts/postContext.js";

const ProfileIssueCard = props => {
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
        props.setUserPosts(res.data.sort((a, b) => b.votes - a.votes));
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

  const upVotePost = id => {
    axiosWithAuth()
      .post(`/posts/${id}/increment/votes`)
      .then(() => {
        fetchPosts();
      })
      .catch(err => {
        console.log("upvote err: ", err.response.data.message);
      });
  };

  // format createdAt to string
  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  const dateString = formatDate(props.post.createdAt);

  return (
    <div className="profileIssueCard">
      <div className="topleft">
        <div className="votes">{props.post.votes}</div>
        <div className="topRight">
          <p>{props.post.title}</p>
          <p>{dateString}</p>
        </div>
        <img />
        <p>{props.post.description}</p>
        <p>{props.post.votes} votes</p>
      </div>
      <div>
        <Button
          size="large"
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => handleEdit(props.post)}
        >
          Edit
        </Button>
        <Button
          size="large"
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={() => deletePost(props.post.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProfileIssueCard;

import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { withRouter } from "react-router-dom";
import { postContext } from "../../contexts/postContext.js";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

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
        <Button
          size="large"
          variant="contained"
          onClick={() => upVotePost(props.post.id)}
        >
          {props.post.votes}
        </Button>
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
    </div>
  );
};

export default withRouter(IssueCard);

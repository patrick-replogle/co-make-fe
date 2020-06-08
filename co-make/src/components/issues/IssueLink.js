import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import { withRouter } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

const IssueLink = (props) => {
  if (props.post.post_image_url === "") {
    props.post.post_image_url =
      "https://pngimage.net/wp-content/uploads/2018/05/default-png-6.png";
  }

  const fetchPosts = () => {
    axiosWithAuth()
      .get("/posts")
      .then((res) => {
        console.log(res.data);
        props.setPosts(res.data.sort((a, b) => b.votes - a.votes));
      })
      .catch((err) => {
        console.log("error fetching: ", err);
      });
  };

  const upVotePost = (id) => {
    axiosWithAuth()
      .post(`/posts/${id}/increment/votes`)
      .then(() => {
        fetchPosts();
      })
      .catch((err) => {
        console.log("upvote err: ", err.response.data.message);
      });
  };

  return (
    <div className="issueLink">
      <Link to={`/post/${props.post.id}`}>
        <img src={props.post.post_image_url} alt="user pic" />
        <h2>{props.post.title}</h2>
        <p>
          {props.post.city}, {props.post.zip_code}{" "}
        </p>
        <p>Created by {props.post.authorUsername}</p>
      </Link>
      <div>
        Votes:
        <Button
          size="large"
          variant="contained"
          onClick={() => upVotePost(props.post.id)}
        >
          {props.post.votes}
        </Button>
      </div>
    </div>
  );
};

export default withRouter(IssueLink);

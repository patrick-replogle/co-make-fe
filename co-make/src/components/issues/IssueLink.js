import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { withRouter } from "react-router-dom";

import { axiosWithAuth } from "../../utils/axiosWithAuth";
import noImage from "../../img/noImage.png";

const IssueLink = ({ post, setPosts }) => {
  const fetchPosts = () => {
    axiosWithAuth()
      .get("/posts")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.sort((a, b) => b.votes - a.votes));
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
      <Link to={`/post/${post.id}`}>
        <img
          src={post.post_image_url !== "" ? post.post_image_url : noImage}
          alt="user pic"
        />
        <h2>
          {post.title.length > 30
            ? post.title.slice(0, 30) + "..."
            : post.title}
        </h2>
        <p>
          {post.city}, {post.zip_code}{" "}
        </p>
        <p>
          Created by {post.authorUsername}{" "}
          {moment(post.created_at).startOf("day").fromNow()}
        </p>
      </Link>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          color: "#565656",
          width: "100%",
          marginLeft: "5%",
        }}
      >
        <ThumbUpIcon
          onClick={() => upVotePost(post.id)}
          style={{
            color: "#e01f3d",
            fontSize: "2.5rem",
            cursor: "pointer",
          }}
        />
        <p
          style={{
            fontSize: "1.6rem",
            marginLeft: "3%",
          }}
        >
          {post.votes}
        </p>
      </div>
    </div>
  );
};

export default withRouter(IssueLink);

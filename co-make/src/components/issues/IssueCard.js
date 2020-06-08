import React, { useEffect, useState } from "react";

import IssueCardHeader from "../headers/IssueCardHeader.js";
import { withRouter } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import IssueComments from "./IssueComments.js";
import AddComment from "./AddComment.js";

const IssueCard = (props) => {
  const [issue, setIssue] = useState({});
  const [comments, setComments] = useState([]);

  const id = props.match.params.id;
  useEffect(() => {
    axiosWithAuth()
      .get(`/posts/${id}`)
      .then((res) => {
        setIssue(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const fetchPosts = () => {
    axiosWithAuth()
      .get(`/posts/${id}`)
      .then((res) => {
        setIssue(res.data);
      })
      .catch((err) => {
        console.log("error fetching: ", err.response.data.message);
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

  if (issue.post_image_url === "") {
    issue.post_image_url =
      "https://pngimage.net/wp-content/uploads/2018/05/default-png-6.png";
  }

  return (
    <>
      <IssueCardHeader />
      <div className="issueCardContainer">
        <div className="card">
          <img src={issue.post_image_url} alt="user pic" />
          <h2>{issue.title}</h2>
          <p>{issue.description}</p>
          <p>
            Location: {issue.city}, {issue.zip_code}
          </p>
          <p>Created by {issue.authorUsername}</p>
          <div>
            votes
            <button onClick={() => upVotePost(issue.id)}>{issue.votes}</button>
          </div>
        </div>
      </div>
      <div className="commentsContainer">
        <AddComment id={id} comments={comments} setComments={setComments} />
        <IssueComments id={id} comments={comments} setComments={setComments} />
      </div>
    </>
  );
};

export default withRouter(IssueCard);

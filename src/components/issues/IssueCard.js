import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import ProtectedHeader from "../other/ProtectedHeader.js";
import { axiosWithAuth } from "../../utils/axiosWithAuth.js";
import { formatDate } from "../../utils/functions";
import IssueComments from "./IssueComments.js";
import AddComment from "./AddComment.js";
import volunteering from "../../img/volunteering.jpg";
import Footer from "../other/Footer.js";

const IssueCard = (props) => {
  const [issue, setIssue] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const postId = props.match.params.id;

  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get(`/posts/${postId}`)
      .then((res) => {
        setIssue(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [postId]);

  const fetchPosts = () => {
    axiosWithAuth()
      .get(`/posts/${postId}`)
      .then((res) => {
        setIssue(res.data);
      })
      .catch((err) => {
        console.log("error fetching: ", err.response.data.message);
      });
  };

  const upVotePost = (postId) => {
    axiosWithAuth()
      .post(`/posts/${postId}/increment/votes`)
      .then(() => {
        fetchPosts();
      })
      .catch((err) => {
        console.log("upvote err: ", err.response.data.message);
      });
  };

  if (isLoading) {
    return (
      <div className="loading">
        <CircularProgress color="primary" size="100px" />
      </div>
    );
  } else {
    return (
      <>
        <ProtectedHeader />
        <div className="issueCardContainer">
          <div className="card">
            <div style={{ width: "100%", display: "flex" }}>
              <img
                src={issue.photo !== "null" ? issue.photo : volunteering}
                alt="issue avatar"
              />
            </div>
            <h2>{issue.title}</h2>
            <p>{issue.description}</p>
            <p>
              Location: {issue.city}, {issue.zip_code}
            </p>
            <p>
              Created by {issue.authorUsername} on {formatDate(issue.createdAt)}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                color: "#565656",
                width: "100%",
                marginLeft: "3%",
              }}
            >
              <ThumbUpIcon
                onClick={() => upVotePost(issue.id)}
                style={{
                  color: "#e01f3d",
                  fontSize: "2.5rem",
                  cursor: "pointer",
                }}
              />
              <p
                style={{
                  fontSize: "1.6rem",
                  marginLeft: "1%",
                }}
              >
                {issue.votes}
              </p>
            </div>
          </div>
          <div className="commentsContainer">
            <AddComment
              postId={postId}
              comments={comments}
              setComments={setComments}
            />
            <IssueComments
              postId={postId}
              comments={comments}
              setComments={setComments}
            />
          </div>
        </div>
        <Footer />
      </>
    );
  }
};

export default IssueCard;

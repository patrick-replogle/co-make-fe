import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import ProtectedHeader from "../other/ProtectedHeader.js";
import { axiosWithAuth } from "../../utils/axiosWithAuth.js";
import { formatDate } from "../../utils/functions";
import IssueComments from "./IssueComments.js";
import AddComment from "./AddComment.js";
import volunteering from "../../img/volunteering.jpg";

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
            <img
              src={issue.photo !== "null" ? issue.photo : volunteering}
              alt="issue avatar"
            />
            <h2>{issue.title}</h2>
            <p>{issue.description}</p>
            <p>
              Location: {issue.city}, {issue.zip_code}
            </p>
            <p>
              Created by {issue.authorUsername} on {formatDate(issue.createdAt)}
            </p>
            <div>
              <p>Votes</p>
              <button onClick={() => upVotePost(issue.id)}>
                {issue.votes}
              </button>
            </div>
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
      </>
    );
  }
};

export default IssueCard;

import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

import IssueCardHeader from '../headers/IssueCardHeader.js';
import { withRouter } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const IssueCard = (props) => {
  const [issue, setIssue] = useState({});

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
        console.log('error fetching: ', err.response.data.message);
      });
  };

  const upVotePost = (id) => {
    axiosWithAuth()
      .post(`/posts/${id}/increment/votes`)
      .then(() => {
        fetchPosts();
      })
      .catch((err) => {
        console.log('upvote err: ', err.response.data.message);
      });
  };

  if (issue.post_image_url === '') {
    issue.post_image_url =
      'https://pngimage.net/wp-content/uploads/2018/05/default-png-6.png';
  }

  return (
    <div>
      <IssueCardHeader />
      <div className="issueCardContainer">
        <div className="card">
          <img src={issue.post_image_url} alt="user pic" />
          <h2>{issue.title}</h2>
          <p>{issue.description}</p>
          <p>City: {issue.city}</p>
          <p>Zip code: {issue.zip_code}</p>
          <p>Posted by {issue.authorUsername}</p>
          <div>
            votes
            <button onClick={() => upVotePost(issue.id)}>{issue.votes}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(IssueCard);

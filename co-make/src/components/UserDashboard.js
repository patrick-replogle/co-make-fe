import React, { useState, useEffect, useContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';

import { axiosWithAuth } from '../utils/axiosWithAuth.js';
import ProfileHeader from './headers/ProfileHeader.js';
import ProfileIssueCard from './issues/ProfileIssueCard.js';
import { userContext } from '../contexts/userContext.js';

const UserDashboard = (props) => {
  const { user, setUser } = useContext(userContext);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get(`/users/${localStorage.getItem('userId')}`)
      .then((res) => {
        setIsLoading(false);
        setUser(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log('err fetching user: ', err.response.data.message);
      });
  }, [setUser]);

  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get('/posts/by/user')
      .then((res) => {
        setIsLoading(false);
        setUserPosts(res.data.sort((a, b) => b.votes - a.votes));
      })
      .catch((err) => {
        setIsLoading(false);
        console.log('Error fetching: ', err.response.data.message);
      });
  }, [setUserPosts]);
  if (isLoading) {
    return (
      <div className="loading">
        <CircularProgress color="primary" size="100px" />
      </div>
    );
  } else {
    return (
      <div className="userDashboardContainer">
        <ProfileHeader />
        <div className="userDashRow">
          <div className="sideNav">
            <h2>Welcome {user.username}</h2>
            <h3>
              {user.first_name} {user.last_name}
            </h3>
            <h3>{user.email}</h3>
            <h3>{userPosts.length} Active Posts</h3>
          </div>
          <div className="postList">
            {userPosts.length < 1 && (
              <p>You currently have no active posts</p>
            )}
            {userPosts.map((post) => {
              return (
                <ProfileIssueCard
                  post={post}
                  key={post.id}
                  setUserPosts={setUserPosts}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(UserDashboard);

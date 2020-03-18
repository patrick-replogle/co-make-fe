import React, { useState, useEffect, useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { axiosWithAuth } from "../utils/axiosWithAuth.js";
import ProfileHeader from "./headers/ProfileHeader.js";
import IssueCard from "./issues/IssueCard.js";
import { userContext } from "../contexts/userContext.js";

const UserDashboard = () => {
  const { user, setUser } = useContext(userContext);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get(`/users/${localStorage.getItem("userId")}`)
      .then(res => {
        setIsLoading(false);
        setUser(res.data);
      })
      .catch(err => {
        setIsLoading(false);
        console.log("err fetching user: ", err.response.data.message);
      });
  }, [setUser]);

  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get("/posts/by/user")
      .then(res => {
        setIsLoading(false);
        setUserPosts(res.data.sort((a, b) => b.votes - a.votes));
      })
      .catch(err => {
        setIsLoading(false);
        console.log("Error fetching: ", err.response.data.message);
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
          <div className="profileLeft">
            <img
              src="https://lh3.googleusercontent.com/proxy/85vi1qW0xCHN1GfkYitoqtHjzm8wUqGh_eqKznnmwL1VE7snoxtlW_alX8TLGXgP-nGX6Q6t_eS9XEQnRn_H5ONMsTCBPjtkLkWqXx0nP2txGbb5EXdZI_YdL_aFGSFvjWtvpdWVz-k81QzGyxz28Vwu"
              alt="profile avatar"
            />
            <h2>Welcome {user.username}</h2>
            <h3>
              {user.first_name} {user.last_name}
            </h3>
            <h3>{user.email}</h3>
            <h3>{userPosts.length} Active Posts</h3>
          </div>
          <div className="profileRight">
            <h2>Your Posts</h2>
            <div className="postList">
              {userPosts.map(post => {
                return (
                  <IssueCard
                    post={post}
                    key={post.id}
                    setUserPosts={setUserPosts}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default UserDashboard;

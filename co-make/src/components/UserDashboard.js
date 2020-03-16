import React, { useState, useEffect } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth.js";
import ProfileHeader from "./headers/ProfileHeader.js";
import IssueCard from "./IssueCard.js";

const UserDashboard = () => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/posts/by/user")
      .then(res => {
        setUserPosts(res.data.sort((a, b) => b.votes - a.votes));
      })
      .catch(err => {
        console.log("Error fetching: ", err.response.data.message);
      });
  }, [setUserPosts]);
  return (
    <div className="userDashboardContainer">
      <ProfileHeader />
      <h2>user dashboard</h2>
      <div className="postList">
        {userPosts.map(post => {
          return (
            <IssueCard post={post} key={post.id} setUserPosts={setUserPosts} />
          );
        })}
      </div>
    </div>
  );
};

export default UserDashboard;

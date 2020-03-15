import React, { useState, useEffect } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth.js";
import IssueCard from "./IssueCard.js";

const UserDashboard = props => {
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    axiosWithAuth()
      .get("/posts/by/user")
      .then(res => {
        console.log(res.data);
        setUserPosts(res.data);
      })
      .catch(err => {
        console.log("Error fetching: ", err.response.datamessage);
      });
  }, [setUserPosts]);
  return (
    <div className="userDashboardContainer">
      <h2>user dashboard</h2>
      {userPosts.map(post => {
        return <IssueCard post={post} key={post.id} />;
      })}
    </div>
  );
};

export default UserDashboard;

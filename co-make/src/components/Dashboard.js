import React, { useEffect, useContext } from "react";

import { postContext } from "../contexts/postContext.js";
import { axiosWithAuth } from "../utils/axiosWithAuth.js";
import IssueLink from "./IssueLink.js";
import DashboardHeader from "./headers/DashboardHeader.js";

const Dashboard = props => {
  const { posts, setPosts } = useContext(postContext);

  useEffect(() => {
    axiosWithAuth()
      .get("/posts")
      .then(res => {
        setPosts(res.data.sort((a, b) => b.votes - a.votes));
      })
      .catch(err => {
        console.log("Error fetching: ", err);
      });
  }, [setPosts]);

  return (
    <div>
      <DashboardHeader />
      <h1>all posts</h1>
      {posts.map(post => {
        return <IssueLink post={post} setPosts={setPosts} key={post.id} />;
      })}
    </div>
  );
};

export default Dashboard;

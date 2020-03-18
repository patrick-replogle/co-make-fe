import React, { useState, useEffect, useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { postContext } from "../contexts/postContext.js";
import { axiosWithAuth } from "../utils/axiosWithAuth.js";
import IssueLink from "./IssueLink.js";
import DashboardHeader from "./headers/DashboardHeader.js";

const Dashboard = props => {
  const [isLoading, setIsLoading] = useState(false);
  const { posts, setPosts } = useContext(postContext);

  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get("/posts")
      .then(res => {
        setIsLoading(false);
        setPosts(res.data.sort((a, b) => b.votes - a.votes));
      })
      .catch(err => {
        setIsLoading(false);
        console.log("Error fetching: ", err);
      });
  }, [setPosts]);

  if (isLoading) {
    return (
      <div className="loading">
        <CircularProgress color="primary" size="100px" />
      </div>
    );
  } else {
    return (
      <div>
        <DashboardHeader />
        <h1>all posts</h1>
        {posts.map(post => {
          return <IssueLink post={post} setPosts={setPosts} key={post.id} />;
        })}
      </div>
    );
  }
};

export default Dashboard;

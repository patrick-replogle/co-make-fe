import React from "react";
import { Link, withRouter } from "react-router-dom";

const DashboardHeader = props => {
  return (
    <div className="dashboardHeader">
      <Link to="/user/posts">Profile</Link>
      <Link to="/addpost">New Post</Link>
      <button
        onClick={() => {
          //localStorage.clear();
          props.history.push("/login");
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default withRouter(DashboardHeader);

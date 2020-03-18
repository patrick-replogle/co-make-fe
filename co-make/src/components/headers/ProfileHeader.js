import React from "react";
import { Link, withRouter } from "react-router-dom";

const ProfileHeader = props => {
  return (
    <div className="profileHeader">
      <h3>Co-Make</h3>
      <Link to="/dashboard">Home</Link>
      <Link to="/addpost">New Post</Link>
      <Link to="/profile_form">Edit Profile</Link>
      <button
        onClick={() => {
          localStorage.clear();
          props.history.push("/login");
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default withRouter(ProfileHeader);

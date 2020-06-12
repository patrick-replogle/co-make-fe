import React from "react";
import { withRouter } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";

const ProfileHeader = (props) => {
  return (
    <div className="profileHeader">
      <h3>CoMake</h3>
      <div className="navBarRight">
        <HomeIcon
          onClick={() => props.history.push("/dashboard")}
          style={{ color: "white", fontSize: "2.5rem", cursor: "pointer" }}
        />
        <AddIcon
          onClick={() => props.history.push("/addpost")}
          style={{ color: "white", fontSize: "2.5rem", cursor: "pointer" }}
        />
        <p
          onClick={() => {
            localStorage.removeItem("coMakeToken");
            props.history.push("/login");
          }}
          style={{ color: "white", fontSize: "1.6rem", cursor: "pointer" }}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default withRouter(ProfileHeader);

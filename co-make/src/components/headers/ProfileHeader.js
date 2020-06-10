import React from "react";
import { withRouter, Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
        <EditIcon
          onClick={() => props.history.push("/profile_form")}
          style={{ color: "white", fontSize: "2.5rem", cursor: "pointer" }}
        />

        <Link
          onClick={() => {
            localStorage.removeItem("coMakeToken");
            props.history.push("/login");
          }}
          style={{ color: "white", fontSize: "1.6rem", cursor: "pointer" }}
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default withRouter(ProfileHeader);

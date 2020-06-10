import React from "react";
import { withRouter, Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";

const AddPostHeader = (props) => {
  return (
    <div className="profileHeader">
      <h3>CoMake</h3>
      <div className="navBarRight">
        <HomeIcon
          onClick={() => props.history.push("/dashboard")}
          style={{ color: "white", fontSize: "2.5rem", cursor: "pointer" }}
        />
        <PersonIcon
          onClick={() => props.history.push("/user/posts")}
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

export default withRouter(AddPostHeader);
